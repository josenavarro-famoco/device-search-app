import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/loginForm';

import {
  login,
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      dispatch(login(username, password));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
