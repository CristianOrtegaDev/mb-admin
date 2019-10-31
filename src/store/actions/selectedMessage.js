import { createActions } from 'redux-actions'

const { resetMessage, selectMessage } = createActions({
  RESET_MESSAGE: () => {},
  SELECT_MESSAGE: data => ({ data })
})

const resetSelectedMessage = () => dispatch => dispatch(resetMessage())

const setSelectedMessage = message => dispatch => dispatch(selectMessage({ message }))

export { setSelectedMessage, selectMessage, resetSelectedMessage, resetMessage }
