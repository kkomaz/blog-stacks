import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Heading,
  Card,
  Content,
} from 'react-bulma-components'
import { Switch, Route } from 'react-router-dom';

class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <div className="dashboard">
        <Card>
          <Card.Content>
            <Content>
              <Heading renderAs="h2">Hello {user.username}!</Heading>
            </Content>
          </Card.Content>
        </Card>
        <Switch>
          <Route
            exact
            path="/users/kkomaz.id/posts"
            render={() => <div>Hello Posts</div>}
          />
        <Route
          exact
          path="/users/kkomaz.id/posts/create"
          render={() => <div>create Posts</div>}
          />
          <Route
            path="/users/kkomaz.id/posts/:post_id"
            render={() => <div>View Post</div>}
          />
        </Switch>
      </div>
    )
  }
}

export default Dashboard
