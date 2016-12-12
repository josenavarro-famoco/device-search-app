import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  width: 400,
  paddingLeft: 16,
  paddingRight: 16,
  top: 'calc(50% - 128px)',
  position: 'absolute',
  maxWidth: 300,
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  onChange = (event, t) => {
    let state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onSubmit = (event) => {
    if (this.props.onLogin) {
      this.props.onLogin(this.state.username, this.state.password);
    }
  }

  render() {
    return (
      <Paper style={style} zDepth={3}>
        <form>
          <TextField
            name="username"
            floatingLabelText="Username"
            hintText="Username"
            value={this.state.username}
            onChange={this.onChange}
            fullWidth
          />
          <TextField
            name="password"
            floatingLabelText="Password"
            hintText="password"
            value={this.state.password}
            onChange={this.onChange}
            fullWidth
            type="password"
          />
          <RaisedButton
            label="Login"
            disabled={this.state.username.length === 0 || this.state.password.length === 0}
            primary
            style={{ margin: 16, marginTop: 32 }}
            onTouchTap={this.onSubmit}
          />
        </form>
      </Paper>
    );
  }
}

export default LoginForm;
