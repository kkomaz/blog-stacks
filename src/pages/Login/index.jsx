import React, { Component } from 'react'
import { UserSession } from 'blockstack'
import {
  Card,
  Content,
  Button,
} from 'react-bulma-components';
import { appConfig } from 'utils/constants'

class Login extends Component {
  state = {
    userSession: new UserSession({ appConfig }),
  }

  signIn = (e) => {
    const { userSession } = this.state;
    e.preventDefault()
    userSession.redirectToSignIn()
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Content>
            <Button
              color="primary"
              onClick={this.signIn}
            >
              Sign in with Blockstack
            </Button>
          </Content>
        </Card.Content>
      </Card>
    );
  }
}

export default Login;
