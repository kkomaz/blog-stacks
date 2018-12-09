import React, { Component } from 'react'
import { lookupProfile } from 'blockstack'
import { Switch, Route } from 'react-router-dom'
import Error from 'components/Error'
import { MyContext } from 'components/User/UserProvider'
import { POST_FILENAME } from 'utils/constants'
import PostsTable from 'components/Post/PostsTable'
import PostDetail from 'components/Post/PostDetail'

class UsernamePostsRoute extends Component {
  constructor(props) {
    super(props)

    const { match } = this.props
    const username = match.params.username

    this.state = {
      username,
      error: '',
      posts: []
    }
  }

  componentDidMount() {
    const { username } = this.state

    lookupProfile(username)
      .then(() => this.loadPosts())
      .catch((err) => {
        this.setState({ error: err.message })
      })
  }

  loadPosts() {
    const { username } = this.state
    const { userSession } = this.context.state

    const options = { username, decrypt: false, zoneFileLookupURL: 'https://core.blockstack.org/v1/names/'}

    userSession.getFile(POST_FILENAME, options)
      .then((data) => {
        this.setState({ posts: JSON.parse(data) })
      })
      .catch((error) => this.setState({ error }))
  }

  render() {
    const { error, username, posts } = this.state
    const { userSession } = this.context.state

    if (error) {
      return <Error errorMessage={error} />
    }

    return (
      <Switch className="username-posts-route">
        <Route
          exact
          path={`/${username}/posts`}
          render={() => <PostsTable type="public" posts={posts} userSession={userSession} username={username} />}
        />
        <Route
          exact
          path={`/${username}/posts/:post_id`}
          render={({ match }) => <PostDetail userSession={userSession} match={match} />}
        />
      </Switch>
    )
  }
}

UsernamePostsRoute.contextType = MyContext

export default UsernamePostsRoute
