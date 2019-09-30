import React, { Component } from 'react'
import Chat from './components/Chat'
import { AppContainer } from './components/Styles'

class App extends Component {
  render() {
    return (
      <AppContainer className="App">
        <Chat />
      </AppContainer>
    )
  }
}

export default App
