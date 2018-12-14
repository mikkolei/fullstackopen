import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  vote = (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.notify(`you voted for '${anecdote.content}'`, 4000)
  }
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  if (filter === '') {
    return anecdotes
  }
  return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return { anecdotes: anecdotesToShow(state.anecdotes, state.filter) }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, notify }
)(AnecdoteList)