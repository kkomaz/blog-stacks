import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AdminPosts from 'pages/admin/_username/posts'
import AdminPostCreate from 'pages/admin/_username/posts/create'
import AdminPostsView from 'pages/admin/_username/posts/_postId'
import AdminPostEdit from 'pages/admin/_username/posts/_postId/edit'

class AdminUsernamePostsRoute extends Component {
  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          render={({ match }) => <AdminPosts match={match} />}
        />
        <Route
          path={`${match.url}/create`}
          render={() => <AdminPostCreate />}
        />
        <Route
          exact
          path={`${match.url}/:post_id`}
          render={({ match }) => <AdminPostsView match={match} />}
        />
        <Route
          path={`${match.url}/:post_id/edit`}
          render={({ match }) => <AdminPostEdit match={match} />}
        />
      </Switch>
    )
  }
}

export default AdminUsernamePostsRoute;
