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


  let rainString;

  if (isRaining) {
    rainString = 'It is currently raining';
  } else if (timeUntilRain > 0) {
    rainString = `Precipitation predicted ~${timeString}`;
  } else {
    rainString = 'No precipitation in the forecast';
  }

  return (
    <div>
      <br/>
      <div>Precipitation:</div>
      <div>{rainString}</div>
    </div>
  );

};

export default Weather;