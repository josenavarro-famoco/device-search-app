import React, { Component } from 'react';
import './details.css';

import Paper from 'material-ui/Paper';

class Details extends Component {

  render() {
    return (
      <Paper className="details-container" >
        {this.props.details}
      </Paper>
    );
  }
}

export default Details;
