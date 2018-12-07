import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'
import Username from 'pages/Users/Username'
import PostsRoutes from './Posts/indexRoute'

class Routes extends Component {
  state = {
    userSession: new UserSession({ appConfig }),
    loadingUser: false,
  }

  render() {
    const { userSession } = this.state
    const user = userSession.loadUserData();

    if (window.location.pathname === '/') {
      return (
        <Redirect to={`/users/${user.username}`} />
      )
    }

    return (
      <div className="home">
        <Switch>
          <Route
            path={`/users/${user.username}`}
            render={() => <Username user={user} />}
          />
          <Route
            path="/posts"
            render={() => <PostsRoutes user={user} userSession={userSession} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
