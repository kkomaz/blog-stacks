import React, { Component } from 'react'
import PostForm from 'components/Post/PostForm'

class PostsCreate extends Component {
  render() {
    const { userSession, username } = this.props;

    return (
      <PostForm
        type="create"
        username={username}
        userSession={userSession}
      />
    )
  }
}

export default PostsCreate
