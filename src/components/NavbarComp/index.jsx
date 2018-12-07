import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bulma-components';

class NavbarComp extends Component {
  state = { open: false }

  static propTypes = {
    userSession: PropTypes.object.isRequired,
  }

  toggleNavbar = () => {
    this.setState({ open: !this.state.open })
  }

  signOut = () => {
    const { userSession } = this.props;

    userSession.signUserOut();
    window.location = '/'
  }

  render() {
    const { open } = this.state
    const { userSession } = this.props

    const isSignedIn = userSession.isUserSignedIn()

    return (
      <Navbar
        color="primary"
        fixed="top"
        active={open}
      >
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <i class="fas fa-stroopwafel" style={{ marginRight: '10px' }}></i>
          <p>Blog Stacks</p>
        </Navbar.Item>

        <Navbar.Burger
          onClick={this.toggleNavbar}
        />
      </Navbar.Brand>

      <Navbar.Menu>
        <Navbar.Container position="end">
          {
            isSignedIn &&
            <Navbar.Item
              onClick={this.signOut}
            >
              Sign Out
            </Navbar.Item>
          }
        </Navbar.Container>
      </Navbar.Menu>
      </Navbar>
    );
  }
}

export default NavbarComp;
