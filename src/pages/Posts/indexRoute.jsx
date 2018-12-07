import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import _ from 'lodash'
import Posts from 'pages/Posts'
import PostCreate from 'pages/Posts/Create'
import Loader from 'components/Loader'
import { POST_FILENAME } from 'utils/constants'

class PostRoutes extends Component {
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
    const { userSession } = this.props
    const { posts } = this.state

    if (_.isEqual(posts.length, 0)) {
      return <Loader />
    }

    return (
      <Switch>
        <Route
          exact
          path="/posts"
          render={() => <Posts posts={posts} />}
          />
        <Route
          path="/posts/create"
          render={() => <PostCreate userSession={userSession} />}
        />
        <Route
          path="/posts/:post_id"
          render={() => <div>Render view posts</div>}
        />
      </Switch>
    )
  }
}

export default PostRoutes;
