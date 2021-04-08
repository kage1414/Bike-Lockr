const axios = require('axios');
const Promise = require('bluebird');
const helper = require('./helper.js');
const TOKEN = require('../config.js');

class Controller {

  theft(req, res) {

    let config = {
      url: 'https://bikewise.org:443/api/v2/incidents',
      method: 'GET',
      params: {
        proximity: req.query.coordinates,
        'proximity_square': 5
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

        res.send(data);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        res.sendStatus(404);
      });

  }

  weather(req, res) {

    let config = {
      url: 'https://api.openweathermap.org/data/2.5/onecall',
      method: 'GET',
      params: {
        appid: TOKEN.weatherTOKEN,
        lat: req.query.lat,
        lon: req.query.lon,
        exclude: 'daily'
      }
    };

    return axios(config)
      .then((response) => {

        let epochRainTime = helper.filterWeather(response.data);

        let data = {
          epochRainTime: epochRainTime
        };
        res.send(data);
      })
      .catch((err) => {
        res.status(400);
        res.send(err);
      });
  }

}

module.exports = Controller;