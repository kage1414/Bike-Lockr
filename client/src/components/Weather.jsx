import React from 'react';

const Weather = (props) => {

  let rainsAt = new Date(props.unixRainTime * 1000);
  let rainsIn = new Date(rainsAt.getTime() - Date.now());

  let timeUntilRain = Math.floor(rainsIn.getTime() / 1000 / 60);
  let timeString;

  if (timeUntilRain > 60) {
    timeUntilRain = Math.floor(timeUntilRain / 60);
    timeString = `${timeUntilRain} hours`;
  } else {
    timeString = `${timeUntilRain} minutes`;
  }

  let isRaining = timeUntilRain === 0;

  if (isRaining) {
    return (
      <div>
        <br/>
        <div>Precipitation:</div>
        <div>It is currently raining</div>
      </div>
    );
  } else if (timeUntilRain > 0) {
    return (
      <div>
        <br/>
        <div>Precipitation:</div>
        <div>Precipitation predicted ~{timeString}</div>
      </div>
    );
  } else {
    return (
      <div>
        <br/>
        <div>Precipitation:</div>
        <div>No precipitation in the forecast</div>
      </div>
    );
  }

};

export default Weather;