import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Card,
  Content
} from 'react-bulma-components'

class Posts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired
    )
  }

  componentDidMount() {
    console.log('mounting')
  }

  render() {
    const { posts } = this.props

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
