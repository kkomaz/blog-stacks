import React, { Component } from 'react'
import _ from 'lodash'
import {
  Card,
  Content,
} from 'react-bulma-components'
import { withRouter } from 'react-router-dom'
import PostsTable from 'components/Post/PostsTable'
import { POST_FILENAME } from 'utils/constants'
import { MyContext } from 'components/User/UserProvider'

class AdminPosts extends Component {
  state = { posts: [] }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts() {
    const { userSession } = this.context.state.currentUser
    const options = { decrypt: false }

    userSession.getFile(POST_FILENAME, options)
      .then((data) => {
        this.setState({ posts: JSON.parse(data) })
      })
      .catch((err) => console.log(err.message))
  }

  deletePost = (postId) => {
    const { userSession } = this.context.state.currentUser
    const { posts } = this.state
    const options = { encrypt: false }

    const filteredPosts = _.filter(posts, (post) => post.id !== postId)

    userSession.putFile(POST_FILENAME, JSON.stringify(filteredPosts), options)
      .then(() => {
        this.setState({ posts: filteredPosts })
      })
      .catch((err) => console.log(err.message))
  }

  render() {
    const { posts } = this.state
    const { userSession, username } = this.context.state.currentUser

    return (
      <Card>
        <Card.Content>
          <Content>
            <PostsTable
              type="admin"
              posts={posts}
              userSession={userSession}
              username={username}
              deletePost={this.deletePost}
            />
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

export default withRouter(AdminPosts)
AdminPosts.contextType = MyContext
