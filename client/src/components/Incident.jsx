import React from 'react';

const Incident = (props) => {

  let date = new Date(props.data.occurred_at * 1000);

  return (
    <div style={{width: 660, height: 'auto', border: '1px solid black', fontSize: '18px', fontFamily: 'Arial', marginLeft: 'auto', marginRight: 'auto'}}>
      {props.data.title}
      <div style={{ fontSize: '11px', fontStyle: 'bold'}}>
        {props.data.description}
      </div>
      <div style={{ fontSize: '10px' }}>
        {props.data.address}
      </div>
      <div style={{ fontSize: '9px', fontStyle: 'italic' }}>
        {date.toDateString()}
      </div>
    </div>
  );
};

export default Incident;