import React from 'react';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.getNearbyIncidents = this.getNearbyIncidents.bind(this);
  }

  getNearbyIncidents(e) {
    e.preventDefault();
    this.props.getNearbyIncidents();
  }

  render() {
    return (
      <form>
        {/* <input type="text"></input> */}
        <input type="submit" style={{ width: 660, height: 80, fontSize: '24px' }} onClick={this.getNearbyIncidents} value="Can I Leave My Bike Unattended?"></input>
      </form>
    );
  }

}

export default Form;