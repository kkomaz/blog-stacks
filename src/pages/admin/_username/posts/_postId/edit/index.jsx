import React, { Component } from 'react'
import PostForm from 'components/Post/PostForm'
import Loader from 'components/Loader'

class PostEdit extends Component {
  state = { post: {}, loading: true }

  componentDidMount = () => {
    const { userSession, match } = this.props
    const options = { decrypt: false }

    userSession.getFile(`post-${match.params.post_id}.json`, options)
      .then((data) => {
        this.setState({ post: JSON.parse(data), loading: false })
      })
  }

  render() {
    const { userSession, username } = this.props
    const { post, loading } = this.state

    if (loading) {
      return <Loader />
    }

    return (
      <PostForm
        post={post}
        type="edit"
        username={username}
        userSession={userSession}
      />
    )
  }
}

export default PostEdit
