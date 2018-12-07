import React, { Component } from 'react'
import { UserSession } from 'blockstack'
import {
  Card,
  Content,
  Button,
} from 'react-bulma-components';
import { appConfig } from 'utils/constants'
import Loader from 'components/Loader'

class Login extends Component {
  state = {
    userSession: new UserSession({ appConfig }),
    loadingUser: false,
  }

  signIn = (e) => {
    const { userSession } = this.state;

    e.preventDefault()
    userSession.redirectToSignIn()
    this.setState({ loadingUser: true })
  }

  render() {
    const { loadingUser } = this.state;

    return (
      <Card>
        <Card.Content>
          <Content>
            {
              loadingUser ? <Loader /> :
              <Button
                color="primary"
                onClick={this.signIn}
              >
                Sign in with Blockstack
              </Button>
            }
          </Content>
        </Card.Content>
      </Card>
    );
  }
}

export default Login;
