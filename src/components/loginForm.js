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
  onSubmit = (event) => {
    this.props.onLogin('user', 'pass');
  }

  render() {
    return (
      <Paper style={style} zDepth={3}>
        <form>
          <TextField
            id="username"
            floatingLabelText="Username"
            hintText="Username"
            fullWidth
          />
          <TextField
            id="password"
            floatingLabelText="Password"
            hintText="password"
            fullWidth
            type="password"
          />
          <RaisedButton label="Login" primary style={{ margin: 16, marginTop: 32 }} onTouchTap={this.onSubmit}/>
        </form>
      </Paper>
    );
  }
}

export default LoginForm;
