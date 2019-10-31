import { createActions } from 'redux-actions'

const { updateUserInfoReducer, setSelectedNeighbourhood } = createActions({
  UPDATE_USER_INFO_REDUCER: data => ({ data }),
  SET_SELECTED_NEIGHBOURHOOD: data => ({ data })
})

const updateUserInfo = userInfo => dispatch => dispatch(updateUserInfoReducer({ value: userInfo }))

const setNeighbourhood = neighbourhood => dispath =>
  dispath(setSelectedNeighbourhood({ value: neighbourhood }))

export { updateUserInfo, updateUserInfoReducer, setNeighbourhood, setSelectedNeighbourhood }
