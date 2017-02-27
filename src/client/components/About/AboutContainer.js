import React from 'react';
import { connect } from 'react-redux';

import { fetchAbout } from '../../data/about/actions';
import About from './About';

function mapStateToProps(state) {
  if (state.about.isLoading) {
    return {
      isLoading: true
    }
  }
  else if (state.about.error) {
    // @todo log error
    return {
      error: true
    }
  }
  else if (state.about.isFetched) {
    return {
      data: state.about.data
    };
  }
  else { 
    return {};
  }
}

export default connect(mapStateToProps, { fetchAbout })(About);