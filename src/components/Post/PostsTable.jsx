import React, { Component } from 'react'
import _ from 'lodash';
import { Table, Button } from 'react-bulma-components'
import { POST_FILENAME } from 'utils/constants'
import { withRouter } from 'react-router-dom'

class PostsTable extends Component {
  deletePost(postId) {
    const { userSession, posts } = this.props
    const options = { encrypt: false }

    const filteredPosts = _.filter(posts, (post) => post.id !== postId)

    userSession.putFile(POST_FILENAME, JSON.stringify(filteredPosts), options)
      .then(() => {
        this.setState({ posts: filteredPosts })
      })
      .catch((err) => console.log(err.message))
  }

  viewAdminPost(postId) {
    const { history, username } = this.props

    history.push(`/admin/${username}/posts/${postId}`)
  }

  viewPublicPost(postId) {
    const { history, username } = this.props

    console.log(postId)

    history.push(`/${username}/posts/${postId}`)
  }

  editPost(postId) {
    const { history, username } = this.props

    history.push(`/admin/${username}/posts/${postId}/edit`)
  }

  displayAdminOptions(post) {
    return (
      <React.Fragment>
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
          onClick={() => this.viewAdminPost(post.id)}
        >
          View
        </Button>
        <Button
          onClick={() => this.deletePost(post.id)}
          color="danger"
        >
          Delete
        </Button>
      </React.Fragment>
    )
  }

  displayPublicOptions(post) {
    return (
      <React.Fragment>
        <Button
          className="mr-one"
          color="info"
          onClick={() => this.viewPublicPost(post.id)}
        >
          View
        </Button>
      </React.Fragment>
    )
  }

  render() {
    const { posts, type } = this.props

    return (
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
                  { _.isEqual(type, 'admin') ? this.displayAdminOptions(post) : this.displayPublicOptions(post)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    )
  }
}

export default withRouter(PostsTable)
