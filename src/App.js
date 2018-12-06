import React, { Component } from 'react';
import { UserSession } from 'blockstack'
import Login from 'pages/Login';
import { Container } from 'react-bulma-components';
import './App.scss';

class App extends Component {
  state = {
    userSession: new UserSession(),
  }

  componentDidMount = async () => {
    const { userSession } = this.state

    if (!userSession.isUserSignedIn() && userSession.isSignInPending()) {
      const userData = await userSession.handlePendingSignIn()

      if (!userData.username) {
        throw new Error('This app requires a username')
      }
    }
  }

  render() {
    const { userSession } = this.state

    return (
      <Container className="App">
        {
          userSession.isUserSignedIn() ?
            <div>Signed in page</div> :
            <Login />
        }
      </Container>
    );
  }
}

export default App;
