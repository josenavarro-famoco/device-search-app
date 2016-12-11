import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/loginForm';

import {
  performLogin,
} from '../actions';

const style = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
}

class Login extends Component {

  render() {
    return (
      <div style={style}>
        <LoginForm onLogin={this.props.onLogin}/>
        {this.props.loading && <p>loading</p>}
        {this.props.errors && <p>errors</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.get('loading'),
    errors: state.auth.get('errors'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      dispatch(performLogin(username, password));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
