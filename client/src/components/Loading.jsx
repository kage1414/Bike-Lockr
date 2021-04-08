import React from 'react';

const Loading = (props) => {
  return (
    <div>
      {props.location && <span><img src="./giphy.gif" style={{ padding: '5px', maxHeight: '20px', maxWidth: '20px'}}/>Getting Location</span>}
      {props.data && <span><img src="./giphy.gif" style={{ padding: '5px', maxHeight: '20px', maxWidth: '20px' }}/>Retrieving Incidents From Server</span>}
      {props.weather && <span><img src="./giphy.gif" style={{ padding: '5px', maxHeight: '20px', maxWidth: '20px' }} />Retrieving Weather From Server</span>}
    </div>
  );
};

export default Loading;