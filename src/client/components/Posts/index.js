import { connect } from 'react-redux'

import { fetchPosts } from '../../data/posts/actions'
import PostList from './PostList'

function mapStateToProps (state) {
  if (state.posts.isLoading) {
    return {
      isLoading: true
    }
  } else if (state.posts.error) {
    // @todo log error
    return {
      error: true
    }
  } else if (state.posts.isFetched) {
    return {
      data: state.posts.data
    }
  } else {
    return {}
  }
}

export default connect(mapStateToProps, { fetchPosts })(PostList)
