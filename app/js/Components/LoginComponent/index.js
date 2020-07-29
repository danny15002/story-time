import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@material-ui/core';

import Actions from '../../Actions';
import Store from '../../Store';
import CONSTANTS from '../../Constants';

class LoginComponenet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isAdmin: false
    };

    this.login = event => this._login(event);
    this.onAdminChange = event => this._onAdminChange(event);
    this.onEmailChange = event => this._onEmailChange(event);
    this.onLogin = event => this._onLogin(event);
    this.onPasswordChange = event => this._onPasswordChange(event);
  }

  componentDidMount() {
    Store.addEventListener(CONSTANTS.SIGN_IN, this.onLogin)
  }

  _onEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  _onPasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  _onAdminChange(event) {
    this.setState({ isAdmin: event.target.checked })
  }

  _login() {
    Actions.signIn(this.state);
  }

  _onLogin() {
    const activeUser = Store.getActiveUser();
    console.log(Store, activeUser)
    if (activeUser.role === 'user')
      return this.props.history.push('/stories/new');

    this.props.history.push('/stories');
  }

  render() {
    const control = (
      <Checkbox
        checked={this.state.isadmin}
        name="isAdmin"
        onChange={this.onAdminChange}
      />
    );

    return (
      <div className="login-component">
        <div>
          <TextField
            label="email"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
        </div>
        <div>
          <TextField
            label="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </div>
        <div>
          <FormControlLabel
            control={control}
            label="Admin"
            labelPlacement="start"
          />
        </div>
        <Button
          color="primary"
          disabled={!(this.state.email && this.state.password)}
          onClick={this.login}
          variant="contained"
        >
          Log In!
        </Button>
      </div>
    );
  }
}

LoginComponenet.propTypes = {
  history: PropTypes.object.isRequired
};

export default LoginComponenet;
