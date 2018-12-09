import React, { Component } from 'react'

// first we will make a new context
export const MyContext = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userSession: props.userSession,
      currentUser: props.userSession.loadUserData()
    }
  }

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default UserProvider
