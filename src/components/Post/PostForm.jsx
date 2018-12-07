import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
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

    const { post } = props

    this.state = {
      title: post.title,
      description: post.description,
      posts: [],
    }
  }

  static propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    userSession: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts = () => {
    const { userSession } = this.props
    const options = { decrypt: false }

    userSession.getFile(POST_FILENAME, options)
      .then((data) => {
        this.setState({ posts: JSON.parse(data) })
      })
      .catch((err) => console.log(err.message))
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    const { type } = this.props

    return _.isEqual(type, 'create') ? this.createPost() : this.editPost()
  }

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  createPost() {
    const options = { encrypt: false }
    const { title, description, posts } = this.state
    const { history, userSession } = this.props
    const id = generateUUID()

    const newPostForIndex = {
      id,
      title
    }

    const newPostForDetail = { ...newPostForIndex, description }

    const promises = Promise.all([
      userSession.putFile(POST_FILENAME, JSON.stringify([...posts, newPostForIndex]), options),
      userSession.putFile(`post-${id}.json`, JSON.stringify(newPostForDetail), options)
    ])

    promises.then(() => history.push('/posts'))
  }

  editPost() {
    const options = { encrypt: false }
    const { title, description, posts } = this.state
    const { history, userSession, post } = this.props

    const editPostForIndex = {
      id: post.id,
      title
    }

    const editPostForDetail = { ...editPostForIndex, description }

    const editPostsIndex = _.map(posts, (p) => {
      if (_.isEqual(p.id, post.id)) {
        return editPostForDetail
      }
      return p
    })

    const promises = Promise.all([
      userSession.putFile(POST_FILENAME, JSON.stringify(editPostsIndex), options),
      userSession.putFile(`post-${post.id}.json`, JSON.stringify(editPostForDetail), options)
    ])

    promises.then(() => history.push('/posts'))
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
                   <Button>Cancel</Button>
                 </Control>
                 <Control>
                   <Button
                     color="link"
                     type="submit"
                    >
                      Submit
                  </Button>
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
