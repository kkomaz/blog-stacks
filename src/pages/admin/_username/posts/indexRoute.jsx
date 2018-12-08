import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Posts from 'pages/admin/_username/posts'
import PostCreate from 'pages/admin/_username/posts/create'
import PostView from 'pages/admin/_username/posts/_postId'
import PostEdit from 'pages/admin/_username/posts/_postId/edit'

class PostRoutes extends Component {
  render() {
    const { userSession, match, username } = this.props

    return (
      <Switch>
        <Route
          exact
          path="/admin/kkomaz.id/posts"
          render={({ match }) => <Posts userSession={userSession} match={match} username={username} />}
        />
        <Route
          path={`${match.url}/create`}
          render={() => <PostCreate userSession={userSession} username={username} />}
        />
        <Route
          exact
          path={`${match.url}/:post_id`}
          render={({ match }) => <PostView userSession={userSession} match={match} />}
        />
        <Route
          path={`${match.url}/:post_id/edit`}
          render={({ match }) => <PostEdit userSession={userSession} match={match} username={username} />}
        />
      </Switch>
    )
  }
}

export default PostRoutes;
