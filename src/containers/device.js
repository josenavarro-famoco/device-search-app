import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchInput from '../components/searchInput';
import Details from '../components/details';

import {
  performSearchDevice,
  searchDeviceFail,
} from '../actions';

class Device extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <SearchInput onSubmit={this.props.onSearchDevice}/>
        {this.props.loading && <p>loading</p>}
        {this.props.errors && <Details details={this.props.errorMessage} />}
        {this.props.information.size > 0 && <Details details={this.props.information} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.device.get('loading'),
    errors: state.device.get('errors'),
    errorMessage: state.device.get('errorMessage'),
    information: state.device.get('deviceInformation'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchDevice: (id = '') => {
      const REG_EXP = /^([a-zA-Z0-9()]+)$/mg;
      const matchRegExp = id.match(REG_EXP);
      if (matchRegExp !== null && matchRegExp.length === 1 && matchRegExp[0] === id) {
        dispatch(performSearchDevice(id));
      } else {
        dispatch(searchDeviceFail(`Invalid value: ${id} `))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);
