import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Username from 'pages/admin/_username'
import PostRoute from 'pages/admin/_username/posts/indexRoute'
import { MyContext } from 'components/User/UserProvider'
import { withRouter } from 'react-router-dom'

class UsernameRoute extends Component {
  componentDidMount() {
    const { history } = this.props
    const { currentUser } = this.context.state
    const { username } = this.props.match.params

    if (currentUser.username !== username) {
      history.push(`/admin/${currentUser.username}`)
    }
  }

  render() {
    const { userSession, username } = this.context.state.currentUser

    return (
      <Switch>
        <Route
          exact
          path={`/admin/${username}`}
          render={() => <Username username={username} />}
        />
        <Route
          path={`/admin/${username}/posts`}
          render={({ match }) =>
            <PostRoute
              match={match}
              username={username}
              userSession={userSession}
            />
          }
        />
      </Switch>
    )
  }
}

export default withRouter(UsernameRoute)
UsernameRoute.contextType = MyContext
