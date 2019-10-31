import { handleActions } from 'redux-actions'
import { resetMessage, selectMessage } from 'store/actions/selectedMessage'

const defaultState = null

const reducer = handleActions(
  {
    [selectMessage]: (
      state,
      {
        payload: {
          data: { message }
        }
      }
    ) => message,
    [resetMessage]: () => defaultState
  },
  defaultState
)

export default reducer
