import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchInput from '../components/searchInput';
import Details from '../components/details';
import Error from '../components/error';

import {
  performSearchDevice,
  searchDeviceFail,
} from '../actions';

class Device extends Component {
  onSearchDevice = (id = '') => {
    if (!this.props.loading) {
      this.props.onSearchDevice(id);
    }
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <SearchInput onSubmit={this.onSearchDevice} loading={this.props.loading}/>
        {this.props.errors.size > 0 && <Error details={this.props.errors} />}
        {this.props.information.size > 0 && <Details details={this.props.information} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.device.get('loading'),
    errors: state.device.get('errors'),
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
        dispatch(searchDeviceFail({ detail: `Invalid value: ${id} ` }))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);
