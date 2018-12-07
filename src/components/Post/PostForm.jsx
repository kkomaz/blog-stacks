import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  Control,
  Field,
  Input,
  Label,
  Textarea,
} from 'react-bulma-components/lib/components/form';
import {
  Button,
  Card,
  Content
} from 'react-bulma-components'
import { POST_FILENAME } from 'utils/constants'
import generateUUID from 'utils/generateUUID'

class PostForm extends Component {
  constructor(props) {
    super(props)

    const { title, description } = props

    this.state = {
      title,
      description
    }
  }

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    userSession: PropTypes.object.isRequired,
  }

  onSubmit = (evt) => {
    evt.preventDefault()

    const options = { encrypt: false }
    const { title, description } = this.state
    const { history, userSession } = this.props

    userSession.putFile(POST_FILENAME, JSON.stringify([{
      id: generateUUID(),
      title,
      description
    }]), options)
      .then(() => {
        history.push('/posts')
      })
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Content>
            <form onSubmit={this.onSubmit} className="post-form">
              <Field>
                <Label>Title</Label>
                <Control>
                  <Input
                    name="title"
                    onChange={this.onChange}
                    placeholder="Title of the Post"
                    value={this.state.title}
                  />
                </Control>
              </Field>
              <Field>
                <Label>Post Description</Label>
                <Control>
                  <Textarea
                    name="description"
                    onChange={this.onChange}
                    placeholder="Create Posts here!"
                    rows={20}
                    value={this.state.description}
                  />
                </Control>
              </Field>
              <Field kind="group">
                 <Control>
                   <Button
                     type="submit"
                    >
                      Submit
                  </Button>
                 </Control>
                 <Control>
                   <Button color="link">Cancel</Button>
                 </Control>
               </Field>
            </form>
          </Content>
        </Card.Content>
      </Card>
    )
  }
}

PostForm.defaultProps = {
  post: {
    title: '',
    description: ''
  }
}

export default withRouter(PostForm)
