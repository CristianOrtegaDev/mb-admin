import { handleActions } from 'redux-actions'
import { resetResource, selectResource } from 'store/actions/selectedResource'

const defaultState = null

const reducer = handleActions(
  {
    [selectResource]: (
      state,
      {
        payload: {
          data: { resource }
        }
      }
    ) => resource,
    [resetResource]: () => defaultState
  },
  defaultState
)

export default reducer
