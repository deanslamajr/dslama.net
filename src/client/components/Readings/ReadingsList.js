import React from 'react'
import Helmet from 'react-helmet'

import Header from '../Header'
import Loader from '../Loader'
import ErrorComponent from '../Error'

import Reading from './Reading'

const summary = 'This is a list of interesting and informative blog posts from others in the international web development community. Most recently discovered posts are nearer the top.'

export default class Readings extends React.Component {
  componentDidMount () {
    if (!this.props.readings) {
      this.props.fetchReadings()
    }
  }

  render () {
    const { readings, isLoading, error } = this.props
    let content

    if (readings) {
      const sortedData = readings.sort((a, b) => b.foundDate - a.foundDate)

      content = (
        <div>
          <Header summary={summary} />
          {
            sortedData.map(readingData => (
              <Reading key={readingData.id} cardData={readingData} />
            ))
          }
        </div>
      )
    } else if (isLoading) {
      content = (
        <div>
          <Header summary={summary} />
          <Loader />
        </div>
      )
    } else if (error) {
      // @todo reroute to 5xx view
      content = <ErrorComponent />
    } else {
      content = null
    }

    return (
      <div>
        <Helmet>
          <title>dslama.net - readings</title>
        </Helmet>
        {content}
      </div>
    )
  }
}
