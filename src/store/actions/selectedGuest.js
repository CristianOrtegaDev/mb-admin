import { createActions } from 'redux-actions'

const { resetGuest, selectGuest } = createActions({
  RESET_GUEST: () => {},
  SELECT_GUEST: data => ({ data })
})

const resetSelectedGuest = () => dispatch => dispatch(resetGuest())

const setSelectedGuest = guest => dispatch => dispatch(selectGuest({ guest }))

export { setSelectedGuest, selectGuest, resetSelectedGuest, resetGuest }
