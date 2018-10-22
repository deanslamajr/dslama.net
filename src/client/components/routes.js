import React from 'react'
import { Route, Switch } from 'react-router'

// Components
import Layout from './Layout'

import About from './About'
import EditAbout from './About/Edit'

import Posts from './Posts'

import Projects from './Projects'

import Readings from './Readings'
import AddReading from './Readings/Add'

import Login from './Login'

const Routes = () => (
  <Switch>
    <Route exact path='/about' render={props => (
      <Layout {...props}>
        <About />
      </Layout>
    )} />
    <Route path='/about/edit' render={props => (
      <Layout {...props}>
        <EditAbout/>
      </Layout>
    )} />
    <Route path='/posts' render={props => (
      <Layout {...props}>
        <Posts/>
      </Layout>
    )} />
    <Route path='/projects' render={props => (
      <Layout {...props}>
        <Projects/>
      </Layout>
    )} />
    <Route exact path='/readings' render={props => (
      <Layout {...props}>
        <Readings/>
      </Layout>
    )} />
    <Route path='/readings/add' render={props => (
      <Layout {...props}>
        <AddReading/>
      </Layout>
    )} />
    <Route path='/babylou' render={props => (
      <Layout {...props}>
        <Login/>
      </Layout>
    )} />
    <Route render={props => (
      <Layout {...props}>
        <About/>
      </Layout>
    )} />
  </Switch>
)

export default Routes
