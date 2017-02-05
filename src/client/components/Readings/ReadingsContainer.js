import React from 'react';
import { connect } from 'react-redux';

import { fetchReadings } from '../../data/readings/actions';
import Readings from './Readings';

const mapStateToProps = state => {
  if (state.readings.isLoading) {
    return {
      isLoading: state.readings.isLoading
    }
  }
  else if (state.readings.error) {
    // @todo log error
    return {
      error: true
    }
  }
  else if (state.readings.isFetched) {
    return {
      readings: state.readings.data
    };
  }
  else { 
    return {};
  }
};

export default connect(mapStateToProps, { fetchReadings })(Readings);