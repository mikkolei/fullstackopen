import React from 'react'

const Form = (props) => {
    return (
        <div>
          <h3>Lisää uusi</h3>
          <form onSubmit={props.addContact}>
            <div>
              nimi: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
              numero: <input value={props.newNumber} onChange={props.handleNumberChange} />  
            </div>    
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
        </div>  
    )
}

export default Form