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
      hasErrors: false,
      touched: {
        username: false,
        password: false,
      },
      errors: {
        username: 'Required field',
        password: 'Required field',
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.errors.equals(this.props.errors) && nextProps.errors.get('error')) {
      this.setState({ hasErrors: true });
    }
  }

  onChange = (event, t) => {
    let state = this.state;
    state[event.target.name] = event.target.value;
    state.touched[event.target.name] = true;
    state.hasErrors = false;
    this.setState(state);
  }

  onSubmit = (event) => {
    if (this.props.onLogin) {
      this.props.onLogin(this.state.username, this.state.password);
      this.setState({
        touched: {
          username: true,
          password: true,
        }
      })
    }
  }

  getErrorText = (fieldName) => {
    if (this.props.errors.get(fieldName)){
      return this.props.errors.get(fieldName);
    } else if (this.state.touched[fieldName] && this.state[fieldName].length <= 0) {
      return this.state.errors[fieldName];
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <Paper style={style} zDepth={3}>
        <form>
          <div style={{ marginBottom: 16}}>
            <TextField
              name="username"
              floatingLabelText="Username"
              hintText="Username"
              value={this.state.username}
              onChange={this.onChange}
              fullWidth
              errorText={this.getErrorText('username')}
              errorStyle={{ textAlign: 'left' }}
            />
            <TextField
              name="password"
              floatingLabelText="Password"
              hintText="password"
              value={this.state.password}
              onChange={this.onChange}
              fullWidth
              type="password"
              errorText={this.getErrorText('password')}
              errorStyle={{ textAlign: 'left' }}
            />
          </div>
          {this.state.hasErrors && <p style={{ color: 'rgb(244, 67, 54)' }}>{errors.get('error_description')}</p>}
          <RaisedButton
            label="Login"
            disabled={this.state.username.length === 0 || this.state.password.length === 0 || this.props.loading || this.state.hasErrors}
            primary
            style={{ margin: 16 }}
            onTouchTap={this.onSubmit}
          />
        </form>
      </Paper>
    );
  }
}

export default LoginForm;
