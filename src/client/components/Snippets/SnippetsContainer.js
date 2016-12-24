import React from 'react';
import axios from 'axios';

import Snippets from './Snippets';

export default class SnippetsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snippets: [],
      hasQueriedData: false
    }
  }

  componentDidMount() {
    // check global state if snippet data was queried during server rendering
    // if it hasn't then query DB for data
    if (!this.state.hasQueriedData) {
      axios.get('/api/snippets')
        .then(res => {
          if (res && res.data && res.data.snippets) {
            this.setState({ snippets: res.data.snippets });
          }
          else {
            throw new Error('/api/snippets did not return expected data shape');
          }
        })
        .catch(error => {
          //@todo log error
        });
    }
  }

  render() {
    // from the test of how to pass data from backend, through react-router
    const { children } = this.props;

    return children
      ? children
      : <Snippets
        cardData={this.state.snippets}
      />
  }
}