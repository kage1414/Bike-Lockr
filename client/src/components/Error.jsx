import React from 'react';

const Error = (props) => {

  return (
    <div>
      <br/>
      <div style={{color: 'maroon'}}>Error: {props.errorMessage}</div>
      {props.consoleError && <div style={{ color: 'maroon' }}>{props.consoleError}</div>}
    </div>
  );

};

export default Error;