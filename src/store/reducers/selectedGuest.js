import { handleActions } from 'redux-actions'
import { resetGuest, selectGuest } from 'store/actions/selectedGuest'

const defaultState = null

const reducer = handleActions(
  {
    [selectGuest]: (
      state,
      {
        payload: {
          data: { guest }
        }
      }
    ) => guest,
    [resetGuest]: () => defaultState
  },
  defaultState
)

export default reducer
