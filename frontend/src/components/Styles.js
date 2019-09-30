import styled from 'styled-components'
import { Button, Toast, Form } from 'react-bootstrap'

export const StyledToast = styled(Toast)`
  margin: 0.75em 0.75em 0.75em 0.75em;
  background-color: ${props => (props.incoming ? 'palevioletred' : 'white')};
`
export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => (props.incoming ? 'flex-end' : 'flex-start')};
  color: ${props => (props.textDarkGray ? 'darkGray' : 'black')};
`
export const StyledButton = styled(Button)`
  background-color: palevioletred;
  border: none;

  &:hover {
    background-color: #c23c69;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(219, 112, 147, 0.5);
  }
`
export const StyledInput = styled(Form.Control)`
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(219, 112, 147, 0.5);
    border: 1px palevioletred;
  }
`

export const AppContainer = styled.div`
  margin: 0.5em 10em 1em 10em;
`
export const MessageDate = styled.small`
  margin-left: 4em;
`
export const MessageBody = styled(Toast.Body)`
  font-size: ${props => (props.highlight ? '120%' : '100%')};
`
