import React, { Component } from 'react';
import './details.css';

import Paper from 'material-ui/Paper';

class Error extends Component {

  renderError = (errors) => {
    switch (typeof errors) {
      case 'string':
        return errors;
      case 'object':
        console.log(errors)
        if (errors.has('detail')) {
          return errors.get('detail');
        }
        return JSON.stringify(this.props.details.toJS());
      default:
        return errors;
    }
  }
  render() {
    return (
      <Paper className="details-container">
        {this.renderError(this.props.details)}
      </Paper>
    );
  }
}

export default Error;
