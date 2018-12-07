import React, { Component } from 'react'
import PostForm from 'components/Post/PostForm'

class PostsCreate extends Component {
  render() {
    const { userSession } = this.props;

    return (
      <PostForm
        userSession={userSession}
        type="create"
      />
    )
  }
}

export default PostsCreate
