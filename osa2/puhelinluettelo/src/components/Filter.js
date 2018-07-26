import React from 'react'

const Filter = (props) => {
    return (
        <div>
          <form>
            <div>
              rajaa näytettäviä:
              <input value={props.filter} onChange={props.handleFilter}/>
            </div>    
          </form>
        </div>
    )
}

export default Filter