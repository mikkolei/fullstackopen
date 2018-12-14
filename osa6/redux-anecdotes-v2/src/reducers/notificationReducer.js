const initialState = ''

const notificationReducer = (store = initialState, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return action.message
  case 'EMPTY':
    return initialState
  default:
    return store
  }
}

export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'EMPTY',
        message
      })
    }, time)
  }
}

export default notificationReducer