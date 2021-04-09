import React from 'react';

const Error = (props) => {

  return (
    <div>
      <br/>
      <div style={{color: 'maroon'}}>Error: {props.errorMessage}</div>
    </div>
  );

};

export default Error;