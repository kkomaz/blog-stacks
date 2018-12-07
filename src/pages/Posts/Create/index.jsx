import React, { Component } from 'react'
import PostForm from 'components/Post/PostForm'

class PostsCreate extends Component {
  render() {
    const { userSession, posts } = this.props;

    return (
      <PostForm userSession={userSession} posts={posts} />
    )
  }
}

export default PostsCreate
