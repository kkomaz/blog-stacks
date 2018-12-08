import React, { Component } from 'react'
import _ from 'lodash'
import { Switch, Route, Redirect } from 'react-router-dom'
import UsernameRoute from 'pages/admin/_username/indexRoute'
import Loader from 'components/Loader'

class Routes extends Component {
  state = { user: {} }

  componentDidMount() {
    const { userSession } = this.props

    const user = userSession.loadUserData()
    this.setState({ user })
  }

  render() {
    const { user } = this.state

    if (_.isEmpty(user)) {
      return <Loader />
    }

    return (
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
        </Switch>
      </div>
    );
  }
}

export default Routes;
