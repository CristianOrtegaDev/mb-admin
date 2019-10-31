import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  relativesList: [],
  loadingRelatives: false
}

const fetchRelativesSuccess = (state, action) => {
  return updateObject(state, { relativesList: action.relatives, loadingRelatives: false })
}

const fetchRelativesFail = state => {
  return updateObject(state, { loadingRelatives: false })
}

const fetchRelativesStart = state => {
  return updateObject(state, { loadingRelatives: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RELATIVES_SUCCESS:
      return fetchRelativesSuccess(state, action)
    case actionTypes.FETCH_RELATIVES_FAIL:
      return fetchRelativesFail(state, action)
    case actionTypes.FETCH_RELATIVES_START:
      return fetchRelativesStart(state, action)
    default:
      return state
  }
}

export default reducer
