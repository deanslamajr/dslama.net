import React from 'react';
import cssModules from 'react-css-modules';
import axios from 'axios';

import styles from './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(type, event) {
    this.setState({[type]: event.target.value});
  }

  handleSubmit() {
    console.log('state:', this.state);
    this.submitCredentials(this.state.username, this.state.password)
      .then(response => {
      
      })
      .catch(error => {

      });
  }

  submitCredentials(username, password) {
    return axios.post('/login', { username, password });
  }

  render() {
    return (
      <div styleName='container'>
          <input type='text' onChange={this.handleChange.bind(this, 'username')} placeholder='username' styleName='form-element' />
          <input type='password' onChange={this.handleChange.bind(this, 'password')} placeholder='password' styleName='form-element' />
          <button onClick={this.handleSubmit} styleName='form-element'>Login</button>
          <div styleName='form-element' />
      </div>
    );
  }
}

export default cssModules(Login, styles);