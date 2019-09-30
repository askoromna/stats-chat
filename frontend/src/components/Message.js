import React from 'react'
import {
  MessageBody,
  MessageContainer,
  MessageDate,
  StyledToast
} from './Styles'
import { Toast } from 'react-bootstrap'

export default ({ name, message, time, incoming, textDarkGray, highlight }) => (
  <MessageContainer incoming={incoming} textDarkGray={textDarkGray}>
    <StyledToast animation={true} incoming={incoming}>
      <Toast.Header closeButton={false}>
        <strong className="mr-auto">{name}</strong>
        <MessageDate>{new Date(time).toLocaleTimeString()}</MessageDate>
      </Toast.Header>
      <MessageBody highlight={highlight}>{message}</MessageBody>
    </StyledToast>
  </MessageContainer>
)
