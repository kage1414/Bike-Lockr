import React from 'react';

const Error = (props) => {

  return (
    <div>
      <br/>
      <div style={{color: 'red'}}>{props.errorMessage}</div>
    </div>
  );

};

export default Error;