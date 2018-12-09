import React, { Component } from 'react'
import _ from 'lodash'
import { Switch, Route, Redirect } from 'react-router-dom'
import UsernameRoute from 'pages/admin/_username/indexRoute'
import Loader from 'components/Loader'
import UserProvider from 'components/User/UserProvider'

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
        <div className="home">
          <Switch>
            <Route
              exact
              path="/"
              render={() => window.location.pathname === '/' && <Redirect to={`/admin/${user.username}`} />}
            />
            <Route
              path="/admin/:username"
              render={({ match }) => <UsernameRoute match={match} />}
            />
            <Route
              path="/posts"
              render={() => <div>Posts</div>}
            />
          </Switch>
        </div>
      </UserProvider>
    );
  }
}

export default Routes;
