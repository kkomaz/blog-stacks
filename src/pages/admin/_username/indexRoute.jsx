import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { UserSession } from 'blockstack'
import { appConfig } from 'utils/constants'
import Username from 'pages/admin/_username'
import PostRoute from 'pages/admin/_username/posts/indexRoute'
import { MyContext } from 'components/User/UserProvider'
import { withRouter } from 'react-router-dom'

class UsernameRoute extends Component {
  constructor(props) {
    super(props)

    const userSession = new UserSession({ appConfig })

    this.state = {
      userSession,
      user: userSession.loadUserData()
    }
  }

  componentDidMount() {
    const { history } = this.props
    const { currentUser } = this.context.state
    const { username } = this.props.match.params

    if (currentUser.username !== username) {
      history.push(`/admin/${currentUser.username}`)
    }
  }

  render() {
    const { userSession, user } = this.state

    return (
      <Switch>
        <Route
          exact
          path={`/admin/${user.username}`}
          render={() => <Username username={user.username} />}
        />
        <Route
          path={`/admin/${user.username}/posts`}
          render={({ match }) =>
            <PostRoute
              match={match}
              username={user.username}
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
