import React from 'react';
import Weather from './Weather.jsx';

const AtRisk = (props) => {

  let rainsAt = new Date(props.epochRainTime * 1000);
  let rainsIn = new Date(rainsAt.getTime() - Date.now());

  let risk;
  let subRisk;

  if (props.theft) {
    risk = 'Do Not Leave Unattended';
    subRisk = 'Theft Risk';
  } else if (rainsIn > 0) {
    risk = 'Yes,';
    subRisk = 'But it will get wet';
  } else {
    risk = 'Yes...';
    subRisk = 'but you should always lock it up';
  }

  return (
    <div>
      {props.initialized &&
      <div>
        <h2 style={{margin: '0px'}}>{risk}</h2>
        <h3 style={{ margin: '0px' }}>{subRisk}</h3>
        <Weather rainsIn={rainsIn} />
      </div>}
    </div>
  );

};

export default AtRisk;