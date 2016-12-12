import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchInput from '../components/searchInput';
import Details from '../components/details';

import {
  changeText,
} from '../actions';

class Device extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <SearchInput onSubmit={this.props.onChangeText} />
        {this.props.text.length > 0 && <Details details={this.props.text} />}
        {this.props.information.size > 0 && <Details details={this.props.information} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.device.get('searchText'),
    information: state.device.get('deviceInformation'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeText: (text = '') => {
      dispatch(changeText(text));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);
