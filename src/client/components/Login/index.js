import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import { media } from '../../style/style-utils'

const SUCCESS = 'success'
const FAILURE = 'failure'
const LOGGEDOUT = 'logged out'
const AUTHENTICATED = 'authenticated'
const NOTAUTHENTICATED = 'not authenticated'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 5.5rem;
`

const CenteredBase = styled.div`
  width: 20%;
  margin: 0.75rem auto;

  ${media.phoneMax`
    width: 45%;
    margin: 0.75rem auto;
  `}
`

const CenteredText = styled(CenteredBase)`
  text-align: center;
`

const AuthText = styled(CenteredText)`
  height: 3em;
`

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loginResult: '',
      authenticated: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkAuthentication = this.checkAuthentication.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleChange (type, event) {
    this.setState({ [type]: event.target.value })
  }

  handleSubmit (event) {
    // prevent page refresh
    event.preventDefault()

    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then(res => {
        this.setState({
          loginResult: SUCCESS,
          authenticated: AUTHENTICATED
        })
      })
      .catch(() => {
        // @todo log error
        this.setState({ loginResult: FAILURE })
      })
  }

  renderLoginResultDiv () {
    return this.state.loginResult
      ? (<CenteredText as='a' onClick={this.checkAuthentication}>{this.state.loginResult}!</CenteredText>)
      : null
  }

  checkAuthentication () {
    axios.get('/status/authentication')
      .then(res => {
        this.setState({ authenticated: AUTHENTICATED })
      })
      .catch(() => {
        // @todo log error
        this.setState({ authenticated: NOTAUTHENTICATED })
      })
  }

  renderAuthenticationCheckDiv () {
    const authState = this.state.authenticated
    return (
      <AuthText>
        <div>{authState}</div>
        {
          authState === AUTHENTICATED
            ? <button onClick={this.logout}>Logout</button>
            : null
        }
      </AuthText>
    )
  }

  logout () {
    // revert login&auth state
    this.setState({
      loginResult: '',
      authenticated: ''
    })

    axios.post('/logout')
      .then(res => {
        this.setState({ loginResult: LOGGEDOUT })
      })
      .catch(() => {
        // @todo log error
        this.setState({ loginResult: FAILURE })
      })
  }

  componentDidMount () {
    this.checkAuthentication()
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        { this.renderAuthenticationCheckDiv() }
        <CenteredBase
          as='input'
          type='text'
          onChange={this.handleChange.bind(this, 'username')}
          placeholder='username'
        />
        <CenteredBase
          as='input'
          type='password'
          onChange={this.handleChange.bind(this, 'password')}
          placeholder='password'
        />
        <CenteredBase
          as='input'
          type='submit'
          value='Login'
        />
        { this.renderLoginResultDiv() }
      </Form>
    )
  }
}

export default Login
