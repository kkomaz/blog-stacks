import React, { Component } from 'react'
import { Card, Content, Heading } from 'react-bulma-components'


class PostDetail extends Component {
  state = { post: {} }

  componentDidMount = () => {
    const { match, userSession } = this.props

    const options = { decrypt: false }
    userSession.getFile(`post-${match.params.post_id}.json`, options)
      .then((data) => this.setState({ post: JSON.parse(data)}))
  }

  render() {
    const { post } = this.state

    return (
      <Card className="post-detail">
        <Card.Content>
          <Content>
            <Heading renderAs="h1">{post.title}</Heading>
            <Heading renderAs="h3">ID: {post.id}</Heading>
            <p>{post.description}</p>
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

export default PostDetail
