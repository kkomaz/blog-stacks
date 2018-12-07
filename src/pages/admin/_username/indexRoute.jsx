import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'
import Username from 'pages/admin/_username'
import PostRoute from 'pages/admin/_username/posts/indexRoute'

class UsernameRoute extends Component {
  state = {
    userSession: new UserSession({ appConfig }),
  }

  render() {
    const { userSession } = this.state
    const user = userSession.loadUserData();
    const username = user.username

    return (
      <Switch>
        <Route
          exact
          path={`/admin/${username}`}
          render={() => <Username username={username} />}
        />
        <Route
          path={`/admin/${username}/posts`}
          render={({ match }) => <PostRoute match={match} userSession={userSession} username={username}/>}
        />
      </Switch>
    )
  }
}

export default UsernameRoute
