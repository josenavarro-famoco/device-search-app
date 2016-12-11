import React, { Component } from 'react';
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavigationBar from './components/navigationBar';

// import Counter from './containers/counter';
import Device from './containers/device';
import Login from './containers/login';

import {
  logout,
  checkUserSession,
} from './actions';

class App extends Component {

  componentWillMount() {
    this.props.onPrepareApp();
  }

  renderApp = () => {
    const { user, onLogout } = this.props;
    return (
      <div>
        {user && <NavigationBar user={user} onLogout={onLogout} />}
        <div className="mui-container mui--text-center">
          {user ?
            <Device /> :
            <Login />
          }
        </div>
      </div>
    );
  }

  renderLoading = () => {
    return (
      <div className="progress-container">
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        {this.props.ready ? this.renderApp() : this.renderLoading()}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.get('user'),
    ready: state.auth.get('ready'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPrepareApp: () => {
      dispatch(checkUserSession());
    },
    onLogout: () => {
      dispatch(logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
