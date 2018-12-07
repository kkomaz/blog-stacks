import React, { Component } from 'react'
import PostForm from 'components/Post/PostForm'
import Loader from 'components/Loader'

class PostEdit extends Component {
  state = { post: {}, loading: false }

  componentDidMount = () => {
    const { userSession, match } = this.props
    const options = { decrypt: false }

    this.setState({ loading: true })

    userSession.getFile(`post-${match.params.post_id}.json`, options)
      .then((data) => {
        this.setState({ post: JSON.parse(data), loading: false })
      })
  }

  render() {
    const { userSession } = this.props
    const { post, loading } = this.state

    if (loading) {
      return <Loader />
    }

    return (
      <PostForm
        userSession={userSession}
        post={post}
        type="edit"
      />
    )
  }
}

export default PostEdit
