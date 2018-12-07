import React, { Component } from 'react';
import { UserSession } from 'blockstack'
import { Container, Navbar } from 'react-bulma-components';
import Login from 'pages/Login';
import './App.scss';

class App extends Component {
  state = {
    userSession: new UserSession(),
    open: false,
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

  toggleNavbar = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { userSession, open } = this.state

    return (
      <div className="App">
        <Navbar
          color="primary"
          fixed="top"
          active={open}
        >
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </Navbar.Item>

          <Navbar.Burger
            onClick={this.toggleNavbar}
          />
        </Navbar.Brand>

        <Navbar.Menu>
          <Navbar.Container position="end">
            <Navbar.Item href="/">Home</Navbar.Item>
            <Navbar.Item href="/about"> About Us</Navbar.Item>
            <Navbar.Item href="/contact"> Contact Us</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
        </Navbar>

        <Container>
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
