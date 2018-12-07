import React, { Component } from 'react'
import _ from 'lodash'
import {
  Card,
  Content
} from 'react-bulma-components'
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

    return (
      <Card>
        <Card.Content>
          <Content>
            <ul>
              {
                _.map(posts, (post) => (
                  <li key={post.id}>
                    {post.title}
                  </li>
                ))
              }
            </ul>
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

export default Posts
