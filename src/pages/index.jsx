import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import UsernameRoute from 'pages/admin/_username/indexRoute'

class Routes extends Component {
  render() {
    return (
      <div className="home">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <div>Hello World!</div>}
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
