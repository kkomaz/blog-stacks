import React, { Component } from 'react';
import { UserSession } from 'blockstack'
import { Container } from 'react-bulma-components';
import Login from 'pages/Login';
import Navbar from 'components/Navbar'
import 'stylesheets/main.scss';

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
      window.location = '/';
    }
  }

  render() {
    const { userSession } = this.state

    return (
      <div className="App">
        <Navbar userSession={userSession} />

        <Container className="mt-one">
          {
            userSession.isUserSignedIn() ?
              <div>Signed in page</div> :
              <Login />
          }
        </Container>
      </div>
    );
  }
}

export default App;
