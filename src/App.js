import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  increment,
  decrement,
} from './actions';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {JSON.stringify(this.props.counter)}
        <p onClick={this.props.onIncrement}>INC</p>
        <p onClick={this.props.onDecrement}>DEC</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter.get('counter')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch(increment());
    },
    onDecrement: () => {
      dispatch(decrement());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
