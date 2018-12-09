import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Heading,
  Button,
  Card,
  Content,
  Columns
} from 'react-bulma-components'
import { Input, Label } from 'react-bulma-components/lib/components/form'
import { withRouter } from 'react-router-dom'
import { MyContext } from 'components/User/UserProvider'

class Username extends Component {
  state = { searchedWord: '' }

  static propTypes = {
    username: PropTypes.string.isRequired,
  }

  navigateToCreatePost = () => {
    const { history, username } = this.props

    history.push(`/admin/${username}/posts/create`)
  }

  onChange = (evt) => {
    this.setState({ searchedWord: evt.target.value })
  }

  searchUserPosts = () => {
    const { history } = this.props
    const { searchedWord } = this.state

    history.push(`/${searchedWord}/posts`)
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

              <div className="mt-one">
                <Columns>
                  <Columns.Column size={6}>
                    <Label>Explore Users Posts</Label>
                    <Input
                      type="text"
                      value={this.state.searchedWord}
                      onChange={this.onChange}
                      onKeyPress={this.handleKeyPress}
                    />
                    <Button onClick={this.searchUserPosts}>
                      Click here to search!
                    </Button>
                  </Columns.Column>
                </Columns>
              </div>

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
