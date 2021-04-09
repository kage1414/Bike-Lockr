import React from 'react';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.getNearbyIncidents = this.getNearbyIncidents.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getNearbyIncidents(e) {
    e.preventDefault();
    this.props.getNearbyIncidents();
  }

  handleChange(e) {
    this.props.handleChange(e);
  }

  render() {
    return (
      <form>
        {/* <input type="text"></input> */}
        <input type="submit" style={{ width: 660, height: 80, fontSize: '24px' }} onClick={this.getNearbyIncidents} value="Can I Leave My Bike Unattended?"></input>
        <br/>
        <input type="text" placeholder="Set Location" onChange={this.handleChange}></input>
      </form>
    );
  }

}

export default Form;