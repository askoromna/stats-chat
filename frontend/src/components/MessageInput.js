import React, { Component } from 'react'
import { Col, Form } from 'react-bootstrap'
import { StyledButton, StyledInput } from './Styles'
import Row from 'react-bootstrap/Row'

class ChatInput extends Component {
  state = {
    message: ''
  }
  onChange = e => {
    this.setState({ message: e.target.value })
    this.props.onTyping()
  }
  render() {
    return (
      <Form
        action=""
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
        }}
      >
        <Form.Group as={Row} controlId="messageInput">
          <Form.Label column sm={2}>
            Message:
          </Form.Label>
          <Col sm={4}>
            <StyledInput
              type="text"
              placeholder={'Enter message...'}
              value={this.state.message}
              onChange={e => this.onChange(e)}
            />
          </Col>
          <Col sm={2}>
            <StyledButton type="submit">Send</StyledButton>
          </Col>
        </Form.Group>
      </Form>
    )
  }
}

export default ChatInput
