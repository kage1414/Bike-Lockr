const axios = require('axios');
const Promise = require('bluebird');
const helper = require('./helper.js');
const weatherTOKEN = process.env.weatherTOKEN;
const locationTOKEN = process.env.locationTOKEN;

class Controller {

  geoCode(req, res) {

    let config = {
      params: {
        address: req.query.inputValue,
        key: locationTOKEN || require('../config.js').locationTOKEN,
      }
    };

    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', config)
      .then((response) => {
        res.status(response.status);
        res.send(response.data.results);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        res.status(err.response.status);
        res.send(err);
      });
  }

  theft(req, res) {

    let config = {
      url: 'https://bikewise.org:443/api/v2/incidents',
      method: 'GET',
      params: {
        proximity: req.query.coordinates,
        'proximity_square': 5,
        'per_page': 500
      }
    };

    return axios(config)
      .then((response) => {

        let incidents = response.data.incidents;
        let atRisk = helper.atRiskIncidents(incidents);
        incidents = helper.filterTheft(incidents);

        let data = {
          incidents: incidents,
          theft: atRisk
        };
        res.status(response.status);
        res.send(response.data.results);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        res.status(err.response.status);
        res.send(err);
      });

  }

  weather(req, res) {

    let config = {
      url: 'https://api.openweathermap.org/data/2.5/onecall',
      method: 'GET',
      params: {
        appid: weatherTOKEN || require('../config.js').weatherTOKEN,
        lat: req.query.lat,
        lon: req.query.lon,
        exclude: 'daily'
      }
    };

    return axios(config)
      .then((response) => {

        let unixRainTime = helper.getUnixRainTime(response.data);
        let data = {
          unixRainTime: process.env.weatherTime || unixRainTime
        };
        res.status(response.status);
        res.send(response.data.results);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        res.status(err.response.status);
        res.send(err);
      });
  }

}

module.exports = Controller;