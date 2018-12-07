import React, { Component } from 'react'
import _ from 'lodash'
import {
  Button,
  Card,
  Content,
  Table,
} from 'react-bulma-components'
import { withRouter } from 'react-router-dom'
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

  deletePost(postId) {
    const { userSession } = this.props
    const { posts } = this.state
    const options = { encrypt: false }

    const filteredPosts = _.filter(posts, (post) => post.id !== postId)

    userSession.putFile(POST_FILENAME, JSON.stringify(filteredPosts), options)
      .then(() => {
        this.setState({ posts: filteredPosts })
      })
      .catch((err) => console.log(err.message))
  }

  viewPost(postId) {
    const { history } = this.props

    history.push(`/posts/${postId}`)
  }

  editPost(postId) {
    const { history } = this.props

    history.push(`/posts/${postId}/edit`)
  }

  render() {
    const { posts } = this.state

    return (
      <Card>
        <Card.Content>
          <Content>
            <Table>
              <thead>
                <tr>
                  <th>
                    Id
                  </th>
                  <th>
                    Title
                  </th>
                  <th>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  _.map(posts, (post) => (
                    <tr key={post.id}>
                      <th>{post.id}</th>
                      <td>{post.title}</td>
                      <td>
                        <Button
                          className="mr-one"
                          color="warning"
                          onClick={() => this.editPost(post.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="mr-one"
                          color="info"
                          onClick={() => this.viewPost(post.id)}
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => this.deletePost(post.id)}
                          color="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

export default withRouter(Posts)
