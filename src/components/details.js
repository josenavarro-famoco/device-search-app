import React, { Component } from 'react';
import './details.css';

import Paper from 'material-ui/Paper';

class Details extends Component {

  renderContent = (value) => {
    switch (typeof value) {
      case 'string':
        return value;
      case 'object':
        return JSON.stringify(value);
      default:
        return value;
    }
  }
  render() {
    return (
      <Paper className="details-container" >
        {this.renderContent(this.props.details)}
      </Paper>
    );
  }
}

export default Details;
