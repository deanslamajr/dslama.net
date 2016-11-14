import React from 'react';
import cssModules from 'react-css-modules';
import axios from 'axios';

import styles from './login.css';

const SUCCESS = 'success';
const FAILURE = 'failure';
const AUTHENTICATED = 'authenticated';
const NOTAUTHENTICATED = 'notauthenticated';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginResult: '',
      authenticated: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  handleChange(type, event) {
    this.setState({ [type]: event.target.value });
  }

  handleSubmit(event) {
    // prevent page refresh
    event.preventDefault();

    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then(res => {
        this.setState({ loginResult: SUCCESS });
      })
      .catch(err => {
        this.setState({ loginResult: FAILURE });
      });
  }

  renderLoginResultDiv() {
    const makeLoginResultMarkup = message => (<a styleName='form-element login-state' onClick={this.checkAuthentication}>{message}!</a>);

    switch (this.state.loginResult) {
      case SUCCESS:
        return makeLoginResultMarkup(SUCCESS);
      case FAILURE:
        return makeLoginResultMarkup(FAILURE);
      default:
        return null
    }
  }

  checkAuthentication() {
    axios.get('/authenticationCheck')
      .then(res => {
        this.setState({ authenticated: AUTHENTICATED });
      })
      .catch(err => {
        this.setState({ authenticated: NOTAUTHENTICATED });
      });
  }

  renderAuthenticationCheckDiv() {
    const makeAuthenticationCheckMarkup = message => (<div styleName='form-element login-state'>{message}!</div>);

    switch (this.state.authenticated) {
      case AUTHENTICATED:
        return makeAuthenticationCheckMarkup(AUTHENTICATED);
      case NOTAUTHENTICATED:
        return makeAuthenticationCheckMarkup(NOTAUTHENTICATED);
      default:
        return null
    }
  }

  render() {
    return (
      <form styleName='container' onSubmit={this.handleSubmit}>
        <input type='text' onChange={this.handleChange.bind(this, 'username')} placeholder='username' styleName='form-element' />
        <input type='password' onChange={this.handleChange.bind(this, 'password')} placeholder='password' styleName='form-element' />
        <input type='submit' value='Login' styleName='form-element' />
        { this.renderLoginResultDiv() }
        { this.renderAuthenticationCheckDiv() }
      </form>
    );
  }
}

export default cssModules(Login, styles, { allowMultiple: true });