import React, { Component } from 'react';
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavigationBar from './components/navigationBar';

// import Counter from './containers/counter';
import Device from './containers/device';
import Login from './containers/login';

import {
  logout,
} from './actions';

class App extends Component {
  render() {
    const { user } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          {user && <NavigationBar user={user} onLogout={this.props.onLogout} />}
          <div className="mui-container mui--text-center">
            {user ?
              <Device /> :
              <Login />
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.get('user')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      console.log('logout')
      dispatch(logout());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
