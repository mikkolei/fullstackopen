import React from 'react'

const Contact = ({ contact, deleteContact }) => {
    return (
        <tr>
            <td>{contact.name} </td>
            <td>{contact.number} </td>
            <td><button onClick={deleteContact}>poista</button></td>
        </tr>    
    )
}

export default Contact