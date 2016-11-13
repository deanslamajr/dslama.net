import React from 'react';
import cssModules from 'react-css-modules';
import axios from 'axios';

import styles from './login.css';

const SUCCESS = 'success';
const FAILURE = 'failure';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loginResult: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
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

  renderSuccessDiv(loginResult) {
    const makeLoginResultMarkup = message => (<div styleName='form-element login-state'>{message}!</div>);

    switch (loginResult) {
      case SUCCESS:
        return makeLoginResultMarkup('Success');
      case FAILURE:
        return makeLoginResultMarkup('Wrong');
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
        { this.renderSuccessDiv(this.state.loginResult) }
      </form>
    );
  }
}

export default cssModules(Login, styles, { allowMultiple: true });