import React from 'react';

import ErrorComponent from '../Error';
import Loader from '../Loader';

import Reading from './Reading';

export default class Readings extends React.Component {
  componentDidMount() {
    if (!this.props.readings) {
      this.props.fetchReadings();
    }
  }

  render() {
    const { readings, isLoading, error } = this.props;

    if (readings) {
      const sortedData = readings.sort((a, b) => b.foundDate - a.foundDate);

      return (
        <div>
          {
            sortedData.map(readingData => (
              <Reading key={readingData.id} cardData={readingData} />
            )) 
          }
        </div>
      );
    }
    else if (isLoading) {
      return <Loader />;
    }
    else if (error) {
      // @todo reroute to 5xx view
      return <ErrorComponent />;
    }
    else {
      return null;
    }
  }
}