import React from 'react';

const Weather = (props) => {

  let rainsAt = new Date(props.unixRainTime * 1000);
  let rainsIn = new Date(rainsAt.getTime() - Date.now());

  let minutesUntilRain = Math.floor(rainsIn.getTime() / 1000 / 60);

  let isRaining = minutesUntilRain === 0;

  if (isRaining) {
    return (
      <div>It is currently raining</div>
    );
  } else if (minutesUntilRain > 0) {
    return (
      <div>Precipitation predicted ~{minutesUntilRain} minutes</div>
    );
  } else {
    return (
      <div>No precipitation in the forecast</div>
    );
  }

};

export default Weather;