import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Heading,
  Button,
  Card,
  Content,
} from 'react-bulma-components'
import { withRouter } from 'react-router-dom'
import { MyContext } from 'components/User/UserProvider'

class Username extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  navigateToCreatePost = () => {
    const { history, username } = this.props

    history.push(`/admin/${username}/posts/create`)
  }

  render() {
    const { username } = this.props;

    return (
      <div className="username">
        <Card>
          <Card.Content>
            <Content>
              <Heading renderAs="h2">Hello {username}!</Heading>
              <Button
                color="primary"
                onClick={this.navigateToCreatePost}
              >
                Create Post
              </Button>
              <MyContext.Consumer>
                {(context) => (
                  <React.Fragment>
                    <p>{context.state.currentUser.username}</p>
                  </React.Fragment>
                )}
              </MyContext.Consumer>
            </Content>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

Username.contextType = MyContext

export default withRouter(Username)
