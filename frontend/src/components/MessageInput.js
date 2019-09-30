import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { StyledButton, StyledInput } from './Styles'

const ChatInput = ({ onTyping, onSubmitMessage }) => {
  const [message, setMessage] = useState('')

  const onChange = e => {
    setMessage(e.target.value)
    onTyping()
  }

  return (
    <Form
      action=""
      onSubmit={e => {
        e.preventDefault()
        onSubmitMessage(message)
        setMessage('')
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
            value={message}
            onChange={onChange}
          />
        </Col>
        <Col sm={2}>
          <StyledButton type="submit">Send</StyledButton>
        </Col>
      </Form.Group>
    </Form>
  )
}

ChatInput.displayName = 'ChatInput'

export default ChatInput
