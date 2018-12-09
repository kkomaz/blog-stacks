import React, { Component } from 'react'
import _ from 'lodash'
import {
  Card,
  Content,
} from 'react-bulma-components'
import { withRouter } from 'react-router-dom'
import PostsTable from 'components/Post/PostsTable'
import { POST_FILENAME } from 'utils/constants'

class Posts extends Component {
  state = { posts: [] }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts() {
    const { userSession } = this.props
    const options = { decrypt: false }

    userSession.getFile(POST_FILENAME, options)
      .then((data) => {
        this.setState({ posts: JSON.parse(data) })
      })
      .catch((err) => console.log(err.message))
  }

  render() {
    const { posts } = this.state
    const { userSession, username } = this.props

    return (
      <Card>
        <Card.Content>
          <Content>
            <PostsTable
              type="admin"
              posts={posts}
              userSession={userSession}
              username={username}
            />
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

export default withRouter(Posts)
