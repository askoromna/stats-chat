import React, { Component } from 'react'
import MessageInput from './MessageInput'
import Message from './Message'
import { Col, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import { StyledInput } from './Styles'
import { takeRight, sortBy, reverse } from 'lodash'

const URL = 'ws://localhost:3030'

class Chat extends Component {
  state = {
    name: 'Hanna',
    messages: [],
    textDarkGray: false,
    highlight: false,
    isTyping: false
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')

      //restore last 10 messages from local storage
      const lastMessages = JSON.parse(localStorage.getItem('lastMessages'))
      this.setState({
        messages: lastMessages ? reverse(lastMessages) : []
      })
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const data = JSON.parse(evt.data)
      data.message && this.addMessage(data.message)
      console.log(data)
      this.setState({ isTyping: data.isTyping })
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL)
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = async messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    if (this.parseMessage(messageString)) {
      const message = {
        name: this.state.name,
        message: messageString,
        time: new Date().getTime(),
        textDarkGray: this.state.textDarkGray,
        highlight: this.state.highlight
      }
      this.setState({ textDarkGray: false, highlight: false })
      this.ws.send(JSON.stringify({ message }))
      await this.addMessage(message)
    }
    this.addMessagesToLocalStorage()
  }

  addMessagesToLocalStorage = () => {
    //add messages to local storage
    const lastMessages = takeRight(sortBy(this.state.messages, 'time'), 10)
    localStorage.setItem('lastMessages', JSON.stringify(lastMessages))
  }

  parseMessage = message => {
    switch (message) {
      case '/think':
        //make text appear in dark gray
        this.setState({ textDarkGray: true })
        return false
      case '/oops':
        this.removeLastMessage()
        return false
      case '/highlight':
        this.setState({ highlight: true })
        return false
      default:
        return true
    }
  }

  removeLastMessage = () => {
    const sortedMessages = sortBy(this.state.messages, 'time')
    this.setState({ messages: reverse(sortedMessages.slice(0, -1)) })
  }

  onTyping = () => {
    this.ws.send(JSON.stringify({ isTyping: true }))
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
    }
    this.setState({
      timeout: setTimeout(
        () => this.ws.send(JSON.stringify({ isTyping: false })),
        2000
      )
    })
  }

  render() {
    return (
      <div>
        <Row className="justify-content-md-center">
          <Col sm={8}>
            <Form.Group as={Row} controlId="nickForm">
              <Form.Label column sm={2}>
                Nick:
              </Form.Label>
              <Col sm={4}>
                <StyledInput
                  type="text"
                  placeholder="Your name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm={8}>
            <MessageInput
              ws={this.ws}
              onSubmitMessage={messageString =>
                this.submitMessage(messageString)
              }
              onTyping={this.onTyping}
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <small>{this.state.isTyping ? 'Your friend is typing...' : ' '}</small>
        </Row>

        {this.state.messages.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            name={message.name}
            time={message.time}
            incoming={message.name === this.state.name}
            textDarkGray={message.textDarkGray}
            highlight={message.highlight}
          />
        ))}
      </div>
    )
  }
}

export default Chat
