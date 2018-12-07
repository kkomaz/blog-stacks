import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Heading,
  Card,
  Content,
} from 'react-bulma-components'

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
      </div>
    )
  }
}

export default Dashboard
