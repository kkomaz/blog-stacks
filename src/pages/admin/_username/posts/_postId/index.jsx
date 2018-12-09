import React, { Component } from 'react'
import PostDetail from 'components/Post/PostDetail'

class PostView extends Component {
  render() {
    const { userSession, match } = this.props

    return <PostDetail userSession={userSession} match={match} />
  }
}

export default PostView
