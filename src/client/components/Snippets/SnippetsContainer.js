import React from 'react';
import axios from 'axios';

import Snippets from './Snippets';

export default class SnippetsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasQueriedData: false
    }

    this.mockData = [
      {
        ID: 1,
        Author: 'Arunoda Susiripala',
        FoundDate: '27 November 2016',
        PublishDate: '14 November 2016',
        Quote: 'Doing the right thing: Building around a router. A lot of modern JavaScript app frameworks didn’t get this correct. A framework should have a router, and it should do more than just client side routing. Next.js has its own router, and it builds on top of it. Most importantly, you don’t really need to know about the router at all.',
        Title: 'Next.Js Is it the next big thing in JavaScript?',
        publication: 'medium.com/javascript-mantra',
        URL: 'https://medium.com/javascript-mantra/next-js-53e9cf4da5af#.68d18b2qz',
        imagePath: 'http://assets.deanslamajr.com/test.jpg'
      },
      {
        ID: 2,
        Author: 'Lukas White',
        FoundDate: '1 December 2016',
        PublishDate: '8 November 2016',
        Quote: 'There are a number of SaaS solutions for logging. These include Loggly, track.js, ErrorCeption, Airbrake and New Relic. Loggly is one of a number of these SaaS solutions. I’m going to use it as an example because it’s easy and free to get started. With the free plan you can log up to 200MB per day, and the data is stored for 7 days.',
        Title: 'Logging Errors in Client-Side Applications',
        publication: 'sitepoint.com',
        URL: 'https://www.sitepoint.com/logging-errors-client-side-apps/',
        imagePath: 'http://assets.deanslamajr.com/test.jpg'
      }
    ];
  }

  componentDidMount() {
    // check global state if snippet data was queried during server rendering
    // if it hasn't then query DB for data
    if (!this.state.hasQueriedData) {
      axios.get('/api/snippets')
        .then(res => {
          if (res && res.data && res.data.snippets) {
            console.log('snippetsArray:', res.data.snippets);
            this.setState({ snippets: res.data.snippets });
          }
          else {
            throw new Error('/api/snippets did not return expected data shape');
          }
        })
        .catch(error => {
          console.log('error', error.message);
        });
    }
  }

  componentWillUnmount() {
    // clear part of global state that says that DB has already been queried
  }

  render() {
    // from the test of how to pass data from backend, through react-router
    const { children } = this.props;

    return children
      ? children
      : <Snippets
        cardData={this.mockData}
      />
  }
}