import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Posts from 'pages/Posts'
import PostCreate from 'pages/Posts/Create'
import PostView from 'pages/Posts/PostId'

class PostRoutes extends Component {
  render() {
    const { userSession } = this.props

    return (
      <Switch>
        <Route
          exact
          path="/posts"
          render={() => <Posts userSession={userSession} />}
          />
        <Route
          path="/posts/create"
          render={() => <PostCreate userSession={userSession} />}
        />
        <Route
          path="/posts/:post_id"
          render={({ match }) => <PostView userSession={userSession} match={match} />}
        />
      </Switch>
    )
  }
}

export default PostRoutes;
