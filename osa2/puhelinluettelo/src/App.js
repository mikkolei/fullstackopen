import React from 'react';
import Contact from './components/Contact'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null,
      error: null
    }
  }

  componentDidMount() {
      personService
        .getAll()
        .then(response => {
            this.setState({ persons: response})
        })
  }

  addContact = (event) => {
    event.preventDefault()
    const names = this.state.persons.map(person => person.name)
    const contactExists = names.includes(this.state.newName)
    const contactObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }
    
    if(contactExists) {
        if(window.confirm(`${contactObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
            const person = this.state.persons.find(p => p.name === contactObject.name)
            const id = person.id
            const updatedContact = {...person, number: contactObject.number}
            personService.update(id, updatedContact)
              .then(updatedContact => {
                  this.setState({
                      persons: this.state.persons.map(p => p.id !== id ? p : updatedContact),
                      newName: '',
                      newNumber: '',
                      notification: `muutettiin henkilön ${this.state.newName} numeroa`
                  })
                  setTimeout(() => {
                      this.setState({notification: null})
                  }, 5000)
              })        
              .catch(error => {
                this.setState({
                    error: `henkilö ${this.state.newName} on jo valitettavasti poistettu palvelimelta`,
                    persons: this.state.persons.filter(p => p.id !== id)
                })
                setTimeout(() => {
                    this.setState({error: null})
                }, 5000)
              })
        } else {
            this.setState({ newName: '', newNumber: '' })
        }    
    } else {
      personService.create(contactObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            notification: `lisättiin ${this.state.newName}`
          })
          setTimeout(() => {
              this.setState({notification: null})
          }, 5000)  
        })
    }  
  }

  deleteContact = (contact) => {
    return () => {
      if(window.confirm(`poistetaanko ${contact.name}?`)) {
        personService
          .deleteObject(contact.id)
          .then(deleted => {
            this.setState({
                persons: this.state.persons.filter(p => p.id !== contact.id),
                notification: `poistettiin ${contact.name}`
            })
            setTimeout(() => {
                this.setState({notification: null})
            }, 5000)
          })
      }  
    }   
  }

  handleContactNameChange = (event) => {
      this.setState({ newName: event.target.value })
  }

  handleContactNumberChange = (event) => {
      this.setState({ newNumber: event.target.value })
  }

  handleFilter = (event) => {
      this.setState({ filter: event.target.value })
  }

  render() {
    const contactsToShow = 
      this.state.persons.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} />
        <Error message={this.state.error} />
        <Filter value={this.state.filter} handleFilter={this.handleFilter} />
        <Form addContact={this.addContact} newName={this.state.newName} handleNameChange={this.handleContactNameChange}
          newNumber={this.state.newNumber} handleNumberChange={this.handleContactNumberChange}
        />
        <h3>Numerot</h3>
          <table>
              <tbody>
                {contactsToShow.map(contact => <Contact key={contact.id} contact={contact} deleteContact={this.deleteContact(contact)}/>)}
              </tbody>
          </table>  
      </div>
    )
  }
}

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
}

const Error = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
}

export default App