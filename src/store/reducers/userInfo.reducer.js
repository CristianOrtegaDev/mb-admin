import { handleActions } from 'redux-actions'
import { updateUserInfoReducer, setSelectedNeighbourhood } from 'store/actions/userInfo.actions'

const defaultState = {
  selectedNeighbourhood: null
}

const reducer = handleActions(
  {
    [updateUserInfoReducer]: (
      state,
      {
        payload: {
          data: { value }
        }
      }
    ) => ({
      ...state,
      ...value
    }),
    [setSelectedNeighbourhood]: (
      state,
      {
        payload: {
          data: { value }
        }
      }
    ) => ({
      ...state,
      selectedNeighbourhood: value
    })
  },
  defaultState
)

export default reducer
