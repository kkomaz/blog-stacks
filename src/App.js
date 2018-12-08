import React, { Component } from 'react';
import { UserSession } from 'blockstack'
import { Container } from 'react-bulma-components';
import Login from 'components/Login';
import Routes from 'pages';
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
              <Routes userSession={userSession} /> :
              <Login />
          }
        </Container>
      </div>
    );
  }
}

export default App;
