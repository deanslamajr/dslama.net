import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import createStore from '../../client/data/store';
import { addReadings } from '../../client/data/readings/actions'
import { addAbout } from '../../client/data/about/actions'

import routes from '../../client/components/routes';
import { verify as verifyJWT } from '../models/jwt';

import { getReadings, getAbout } from '../models/db';

function fetchDataByPath(req) {
  return new Promise((resolve, reject) => {
    const store = createStore();

    switch(req.originalUrl) {
      case '/about':
        getAbout()
          .then(data => {
            store.dispatch(addAbout(data));
            resolve({ store });
          })
          .catch(err => {
            console.error(err);
            //@todo log error
            resolve();
          });
        break;
      case '/readings':
        getReadings()
          .then(data => {
            store.dispatch(addReadings(data));
            resolve({ store });
          })
          .catch(err => {
            console.error(err);
            //@todo log error
            resolve();
          });
        break;
      case '/readings/add':
        verifyJWT(req)
          .then(() => {
            resolve();
          })
          .catch(() => {
            // @todo log warning
            resolve({ redirect: { pathname: '/', search: '' } })
          });
        break;
      default:
        resolve();
    }  
  });
}

/**
  * Perform server-side async data fetching in this function (according to path)
  **/
function matchRoutes(routes, req) {
  return new Promise((resolve, reject) => {
    match({ routes, location: req.originalUrl }, (err, redirect, props) => {
      if (err) {
        reject(err);
      }
      else {
        fetchDataByPath(req)
          .then(result => {
            let store;

            if (result) {
              redirect = result.redirect || redirect;
              store = result.store;
            }

            resolve({ props, redirect, store });
          });
      }
    });
  });
}

function renderComponent(req, res) {
  matchRoutes(routes, req)
    .then(({ redirect, props, store }) => {
      if (redirect) {
        res.redirect(302, redirect.pathname + redirect.search);
      } 
      else if (props) {
        store = store || createStore();

        const initialState = JSON.stringify(store.getState());
        // generate store with data
        const markup = renderToString(
          <Provider store={store} key='provider'>
            <RouterContext
              {...props}
              createElement={(Component, props) => {
                  return <Component {...props} />;
              }}
            />
          </Provider>
        );
        
        res
          .status(200)
          .render('index', { markup, initialState });
      } 
      else {
        // @todo: replace with 302 redirect to /404
        res
          .status(404)
          .send('Not found');
      }
    })
    .catch(error => {
      // @todo log error
      res
        .status(500)
        .send('500: System Error');
    });
}

export default renderComponent;