import React, { Component } from 'react'
import PostDetail from 'components/Post/PostDetail'
import { MyContext } from 'components/User/UserProvider'

class AdminPostsView extends Component {
  render() {
    const { match } = this.props
    const { userSession } = this.context.state.currentUser

    return (
      <div className="admin-post-view">
        <PostDetail match={match} userSession={userSession} />
      </div>
    )
  }
}

AdminPostsView.contextType = MyContext
export default AdminPostsView
