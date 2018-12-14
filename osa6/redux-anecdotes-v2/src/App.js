import React from 'react'
import { connect } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {
  componentDidMount () {
    this.props.initAnecdotes()
  }

  render() {

    return (
      <div>
        <h1>Anecdotes</h1>
        <Filter />
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
  null,
  { initAnecdotes }
)(App)