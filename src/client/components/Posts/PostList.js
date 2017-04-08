import React from 'react'

import ErrorComponent from '../Error'
import Loader from '../Loader'

import Post from './Post'

export default class PostList extends React.Component {
  componentDidMount () {
    if (!this.props.data) {
      this.props.fetchPosts()
    }
  }

  render () {
    const { data, isLoading, error } = this.props

    if (data && data.length) {
      return (
        <div>
          {
            data.map(postData => (
              <Post key={postData.id} data={postData} />
            ))
          }
        </div>
      )
    } else if (isLoading) {
      return <Loader />
    } else if (error) {
      // @todo reroute to 5xx view
      return <ErrorComponent />
    } else {
      return null
    }
  }
}
