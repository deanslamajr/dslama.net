import React from 'react'

import Header from '../Header'
import Loader from '../Loader'
import ErrorComponent from '../Error'

import Post from './Post'

const summary = 'This is a list of blog posts authored by the developer. Most recently published posts are nearer the top.'

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
          <Header summary={summary} />
          {
            data.map(postData => (
              <Post key={postData.id} data={postData} />
            ))
          }
        </div>
      )
    } else if (isLoading) {
      return (
        <div>
          <Header summary={summary} />
          <Loader />
        </div>
      )
    } else if (error) {
      // @todo reroute to 5xx view
      return <ErrorComponent />
    } else {
      return null
    }
  }
}
