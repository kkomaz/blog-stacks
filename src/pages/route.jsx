import React, { Component } from 'react'
import _ from 'lodash'
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminUsernameRoute from 'pages/admin/_username/route'
import Loader from 'components/Loader'
import UserProvider from 'components/User/UserProvider'
import UsernamePostsRoute from 'pages/_username/posts/route'

class Routes extends Component {
  state = { user: {} }

  componentDidMount() {
    const { userSession } = this.props

    const user = userSession.loadUserData()
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    const { userSession } = this.props

    if (_.isEmpty(user)) {
      return <Loader />
    }

    return (
      <UserProvider userSession={userSession}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => window.location.pathname === '/' && <Redirect to={`/admin/${user.username}`} />}
          />
          <Route
            path="/:username/posts"
            render={({ match }) => <UsernamePostsRoute match={match} />}
          />
          <Route
            path="/admin/:username"
            render={({ match }) => <AdminUsernameRoute match={match} />}
          />
        </Switch>
      </UserProvider>
    );
  }
}

export default Routes;
