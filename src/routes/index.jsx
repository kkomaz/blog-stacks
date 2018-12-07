import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'
import Dashboard from '../components/Dashboard'

class Routes extends Component {
  state = {
    userSession: new UserSession({ appConfig }),
    loadingUser: false,
  }

  render() {
    const { userSession } = this.state
    const user = userSession.loadUserData();

    if(window.location.pathname === '/') {
      return (
        <Redirect to={`/users/${user.username}`} />
      )
    }

    return (
      <div className="home">
        <Switch>
          <Route
            path={`/users/${user.username}`}
            render={() => <Dashboard user={user} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
