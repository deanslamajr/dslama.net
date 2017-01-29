import React from 'react';
import axios from 'axios';

import Readings from './Readings';

export default class ReadingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readings: [],
      hasQueriedData: false
    }
  }

  componentDidMount() {
    // check global state if readings data was queried during server rendering
    // if it hasn't then query DB for data
    if (!this.state.hasQueriedData) {
      axios.get('/api/readings')
        .then(res => {
          if (res && res.data && res.data.readings) {
            this.setState({ readings: res.data.readings });
          }
          else {
            throw new Error('/api/readings did not return expected data shape');
          }
        })
        .catch(error => {
          //@todo log error
        });
    }
  }

  render() {
    return <Readings cardData={this.state.readings} />
  }
}