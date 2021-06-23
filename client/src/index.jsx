import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import IncidentList from './components/IncidentList.jsx';
import Form from './components/Form.jsx';
import Loading from './components/Loading.jsx';
import AtRisk from './components/AtRisk.jsx';
import Error from './components/Error.tsx';

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
      errorMessage: '',
      unixRainTime: false,
      inputValue: ''
    };
  }

  getPosition() {

    if (this.state.inputValue) {

      let inputValue = this.state.inputValue;

      return axios.get('/geoCode', {
        params: {
          inputValue: inputValue
        }})
        .then((response) => {
          if (response.data.length > 0) {
            let stateData = {
              lat: response.data[0].geometry.location.lat,
              lon: response.data[0].geometry.location.lng
            };
            return stateData;
          }
        })
        .catch((error) => {
          this.setState({
            errorMessage: 'Location Error',
            consoleError: error.message
          });
        });
    } else {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((location) => {
          let data = {
            lat: location.coords.latitude,
            lon: location.coords.longitude
          };
          resolve(data);
        }, (error) => {
          this.setState({
            errorMessage: 'Location Error',
            consoleError: error.message
          });
          reject(error);
        }, {maximumAge: 10000});
      });
    }
  }

  getTheftData() {
    let coordinates = this.state.lat + ',' + this.state.lon;
    return axios.get('/theft', {
      params: {
        coordinates: coordinates,
        inputValue: this.state.inputValue
      }})
      .then((incidents) => {
        return incidents.data;
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'Incident Error',
          consoleError: error.message
        });
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
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          errorMessage: 'Weather Error',
          consoleError: error.message
        });
      });
  }

  gatherData(e) {
    e.preventDefault();

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
      .catch((error) => {
        if (error) {
          console.error(error);
        }
        this.setState({
          loadingLocation: false,
          loadingWeather: false,
          loadingData: false,
          error: true
        });
      });

  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {

    return (
      <div style={{textAlign: 'center'}}>
        <h1>Bike Lockr</h1>
        <Form getNearbyIncidents={this.gatherData.bind(this)} handleChange={this.handleChange.bind(this)} />
        <AtRisk initialized={this.state.initialized} theft={this.state.theft} unixRainTime={this.state.unixRainTime} />
        {this.state.error && <Error errorMessage={this.state.errorMessage} consoleError={this.state.consoleError} />}
        <Loading location={this.state.loadingLocation} data={this.state.loadingData} weather={this.state.loadingWeather} />
        {this.state.incidents.length > 0 && <IncidentList incidents={this.state.incidents} />}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));