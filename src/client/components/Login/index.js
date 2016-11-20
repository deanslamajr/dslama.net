import React from 'react';
import cssModules from 'react-css-modules';
import axios from 'axios';

import styles from './login.css';

const SUCCESS = 'success';
const FAILURE = 'failure';
const LOGGEDOUT = 'logged out'
const AUTHENTICATED = 'authenticated';
const NOTAUTHENTICATED = 'not authenticated';

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
    this.logout = this.logout.bind(this);
  }

  handleChange(type, event) {
    this.setState({ [type]: event.target.value });
  }

  handleSubmit(event) {
    // prevent page refresh
    event.preventDefault();

    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then(res => {
        this.setState({ 
          loginResult: SUCCESS,
          authenticated: AUTHENTICATED 
        });
      })
      .catch(err => {
        this.setState({ loginResult: FAILURE });
      });
  }

  renderLoginResultDiv() {
    return this.state.loginResult
      ? ( <a styleName='form-element form-text' onClick={this.checkAuthentication}>{this.state.loginResult}!</a> )
      : null;
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
    const authState = this.state.authenticated;
    return (
      <div styleName='form-element form-text auth-div'>
        <div>{authState}</div>
        {
          authState === AUTHENTICATED
            ? <button onClick={this.logout}>Logout</button>
            : null
        }
      </div>
    );
  }

  logout() {
    // revert login&auth state
    this.setState({ 
      loginResult: '',
      authenticated: '' 
    });

    axios.post('/logout')
      .then(res => {
        this.setState({ loginResult: LOGGEDOUT });
      })
      .catch(err => {
        this.setState({ loginResult: FAILURE });
      });
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  render() {
    return (
      <form styleName='container' onSubmit={this.handleSubmit}>
        { this.renderAuthenticationCheckDiv() }
        <input type='text' onChange={this.handleChange.bind(this, 'username')} placeholder='username' styleName='form-element' />
        <input type='password' onChange={this.handleChange.bind(this, 'password')} placeholder='password' styleName='form-element' />
        <input type='submit' value='Login' styleName='form-element' />
        { this.renderLoginResultDiv() }
      </form>
    );
  }
}

export default cssModules(Login, styles, { allowMultiple: true });