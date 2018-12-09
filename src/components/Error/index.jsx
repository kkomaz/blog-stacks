import React from 'react'
import {
  Message,
} from 'react-bulma-components'

const error = (props) => (
  <Message color="danger">
    <Message.Header>
      Title
    </Message.Header>
    <Message.Body>
      {props.errorMessage}
    </Message.Body>
  </Message>
)

export default error
