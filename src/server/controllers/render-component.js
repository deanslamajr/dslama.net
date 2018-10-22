import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'

import createStore from '../../client/data/store'

import { addReadings } from '../../client/data/readings/actions'
import { addAbout } from '../../client/data/about/actions'
import { addPosts } from '../../client/data/posts/actions'
import { addProjects } from '../../client/data/projects/actions'

import Routes from '../../client/components/routes'
import { verify as verifyJWT } from '../models/jwt'

import { get as getPosts } from '../models/posts'
import { get as getReadings } from '../models/readings'
import { get as getAbout } from '../models/about'
import { get as getProjects } from '../models/projects'

function fetchDataByPath (req) {
  return new Promise((resolve, reject) => {
    const store = createStore()

    switch (req.originalUrl) {
      case '/':
      case '/about':
        getAbout()
          .then(data => {
            store.dispatch(addAbout(data))
            resolve({ store })
          })
          .catch(() => {
            // @todo log error
            resolve()
          })
        break
      case '/projects':
        getProjects()
          .then(data => {
            store.dispatch(addProjects(data))
            resolve({ store })
          })
          .catch(() => {
            // @todo log error
            resolve()
          })
        break
      case '/posts':
        getPosts()
          .then(data => {
            store.dispatch(addPosts(data))
            resolve({ store })
          })
          .catch(() => {
            // @todo log error
            resolve()
          })
        break
      case '/readings':
        getReadings()
          .then(data => {
            store.dispatch(addReadings(data))
            resolve({ store })
          })
          .catch(() => {
            // @todo log error
            resolve()
          })
        break
      case '/readings/add':
        verifyJWT(req)
          .then(() => {
            resolve()
          })
          .catch(() => {
            // @todo log warning
            resolve({ redirect: { pathname: '/', search: '' } })
          })
        break
      default:
        resolve()
    }
  })
}

/**
  * Perform server-side async data fetching in this function (according to path)
  **/
function matchRoutes (req) {
  return new Promise((resolve) => {
    fetchDataByPath(req)
      .then(result => {
        let store
        let redirect

        if (result) {
          redirect = result.redirect
          store = result.store
        }

        resolve({ redirect, store })
      })
  })
}

function renderComponent (req, res) {
  matchRoutes(req)
    .then(({ redirect, store }) => {
      if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search)
      } else {
        const context = {};
  
        store = store || createStore()
        const initialState = JSON.stringify(store.getState())

        const sheet = new ServerStyleSheet()
        
        const markup = renderToString(
          sheet.collectStyles(
            <Provider store={store} key='provider'>
              <StaticRouter location={req.url} context={context}>
                <Routes />
              </StaticRouter>
            </Provider>
          )
        );

        const styleTags = sheet.getStyleTags()

        res
          .status(200)
          .render('index', { markup, styleTags, initialState })
        }
    })
    .catch(err => {
      // @todo log error
      console.error(err)
      res
        .status(500)
        .send('500: System Error')
    })
}

export default renderComponent
