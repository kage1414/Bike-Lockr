import React, { FC, ReactElement} from 'react';

interface ErrorProps {
  errorMessage: string,
  consoleError: string
}

const Error: FC<ErrorProps> = (props) => {

  return (
    <div>
      <br/>
      <div style={{color: 'maroon'}}>Error: {props.errorMessage}</div>
      {props.consoleError && <div style={{ color: 'maroon' }}>{props.consoleError}</div>}
    </div>
  );

};

export default Error;