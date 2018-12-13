import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          username
            <input
              value={props.username}
              onChange={props.handleFieldChange}
              name="username"
            />
        </div>
        <div>
          password
            <input
              value={props.password}
              onChange={props.handleFieldChange}
              name="password"
              type="password"
            />  
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm