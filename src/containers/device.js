import React, { Component } from 'react';
import { connect } from 'react-redux';

class Device extends Component {
  render() {
    return (
      <div>
        DEVICE
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);
