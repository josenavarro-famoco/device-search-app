import React, { Component } from 'react';
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import {
  increment,
  decrement,
} from '../actions';

const style = {
  margin: 12,
};

class Counter extends Component {
  render() {
    return (
      <div style={Object.assign(style, { marginTop: 24 })}>
        <RaisedButton label="INC" primary style={style} onTouchTap={this.props.onIncrement} />
        <RaisedButton label="DEC" secondary style={style} onTouchTap={this.props.onDecrement}  />
        <Badge
          badgeContent={this.props.counter !== 0 && this.props.counter}
          primary={this.props.counter > 0}
          secondary={this.props.counter < 0}
        >
          <NotificationsIcon />
        </Badge>
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

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
