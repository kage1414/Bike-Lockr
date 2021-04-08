import React from 'react';

const Weather = (props) => {

  let minutesUntilRain = Math.floor(props.rainsIn.getTime() / 1000 / 60);

  let isRaining = minutesUntilRain === 0;

  if (isRaining) {
    return (
      <div>It is currently raining</div>
    );
  } else if (props.rainsIn.getTime() > 0) {
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