import React from 'react';
import Incident from './Incident.jsx';

class IncidentList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>{this.props.incidents.length} {'Incident(s) in the last 30 Days:'}</h4>
        {this.props.incidents.map((incident) => {
          return <Incident data={incident} key={incident.id} />;
        })}
      </div>
    );
  }
}

export default IncidentList;