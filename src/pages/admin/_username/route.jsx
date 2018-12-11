import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Username from 'pages/admin/_username'
import AdminUsernamePostsRoute from 'pages/admin/_username/posts/route'
import { MyContext } from 'components/User/UserProvider'
import { withRouter } from 'react-router-dom'

class AdminUsernameRoute extends Component {
  componentDidMount() {
    const { history } = this.props
    const { currentUser } = this.context.state
    const { username } = this.props.match.params

    if (currentUser.username !== username) {
      history.push(`/admin/${currentUser.username}`)
    }
  }

  render() {
    const { username } = this.context.state.currentUser

    return (
      <Switch>
        <Route
          exact
          path={`/admin/${username}`}
          render={() => <Username username={username} />}
        />
        <Route
          path={`/admin/${username}/posts`}
          render={({ match }) => <AdminUsernamePostsRoute match={match} />
          }
        />
      </Switch>
    )
  }
}

export default withRouter(AdminUsernameRoute)
AdminUsernameRoute.contextType = MyContext
