import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PostCreate from 'pages/Posts/Create'

const postsRoutes = () => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/posts"
          render={() => <div>Render all posts</div>}
          />
        <Route
          path="/posts/create"
          render={() => <PostCreate />}
        />
        <Route
          path="/posts/:post_id"
          render={() => <div>Render view posts</div>}
        />
      </Switch>
    </div>
  )
}

export default postsRoutes;
