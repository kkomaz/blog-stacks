import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'

class Home extends Component {
  state = {
    userSession: new UserSession({ appConfig }),
    loadingUser: false,
  }

  render() {
    const { userSession } = this.state
    const userInfo = userSession.loadUserData();
    const { username } = userInfo;

    if(window.location.pathname === '/') {
      return (
        <Redirect to={`/users/${username}`} />
      )
    }

    return (
      <div className="home">
        <Switch>
          <Route
            path={`/users/${username}`}
            render={() => <div>Hello {username}!</div>}
          />
        </Switch>
      </div>
    );
  }
}

export default Home;
