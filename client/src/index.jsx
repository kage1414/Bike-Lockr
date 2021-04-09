import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import IncidentList from './components/IncidentList.jsx';
import Form from './components/Form.jsx';
import Loading from './components/Loading.jsx';
import AtRisk from './components/AtRisk.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      lat: '',
      lon: '',
      loadingLocation: false,
      loadingWeather: false,
      loadingData: false,
      initialized: false,
      error: false,
      unixRainTime: false
    };
  }

  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((location) => {
        let data = {
          lat: location.coords.latitude,
          lon: location.coords.longitude
        };
        resolve(data);
      });
    });
  }

  getTheftData() {
    let coordinates = this.state.lat + ',' + this.state.lon;
    return axios.get('/theft', { params: {coordinates: coordinates}})
      .then((incidents) => {
        return incidents.data;
      });
  }

  getWeatherData() {
    return axios.get('/weather', {
      params: {
        lat: this.state.lat,
        lon: this.state.lon
      }
    })
      .then((response) => {
        return response.data;
      });
  }

  gatherData() {

    this.setState({
      loadingLocation: true,
      error: false
    });

    this.getPosition()
      .then((data) => {

        let otherState = {
          loadingLocation: false,
          loadingData: true
        };

        let state = Object.assign(data, otherState);

        this.setState(state);

        return this.getTheftData();
      })
      .then((data) => {
        let otherState = {
          loadingData: false,
          loadingWeather: true
        };

        let state = Object.assign(data, otherState);

        this.setState(state);

        return this.getWeatherData();
      })
      .then((data) => {
        let otherState = {
          loadingWeather: false,
          initialized: true
        };

        let state = Object.assign(data, otherState);

        this.setState(state);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
        this.setState({
          loadingLocation: false,
          loadingWeather: false,
          loadingData: false,
          error: err
        });
      });

  }

  render() {

    return (
      <div style={{textAlign: 'center'}}>
        <h1>Bike Lockr</h1>
        <Form getNearbyIncidents={this.gatherData.bind(this)} />
        <AtRisk initialized={this.state.initialized} theft={this.state.theft} unixRainTime={this.state.unixRainTime} />
        {<Error error={this.state.error} /> && this.state.error}
        <Loading location={this.state.loadingLocation} data={this.state.loadingData} weather={this.state.loadingWeather} />
        {<IncidentList incidents={this.state.incidents} /> && this.state.incidents.length > 0}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));