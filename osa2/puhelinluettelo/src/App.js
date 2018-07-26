import React from 'react';
import Contact from './components/Contact'
import Form from './components/Form'
import Filter from './components/Filter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addContact = (event) => {
    event.preventDefault()
    const names = this.state.persons.map(person => person.name)
    
    if(names.includes(this.state.newName)) {
        this.setState({ newName: '', newNumber: '' })
        alert("Contact is already created")
    } else {
      const contactObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      const persons = this.state.persons.concat(contactObject)

      this.setState({
        persons,
        newName: '',
        newNumber: ''
      })
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
        <Filter value={this.state.filter} handleFilter={this.handleFilter} />
        <Form addContact={this.addContact} newName={this.state.newName} handleNameChange={this.handleContactNameChange}
          newNumber={this.state.newNumber} handleNumberChange={this.handleContactNumberChange}
        />
        <h3>Numerot</h3>
          <ul>
            {contactsToShow.map(contact => <Contact key={contact.name} contact={contact}/>)}
          </ul>  
      </div>
    )
  }
}

export default App