import * as actionTypes from '../actions/actionTypes'
import { updateObject } from 'shared/utility'

const initialState = {
  lotsList: [],
  loadingLots: false
}

const fetchLotsByNeighbourhoodSucces = (state, action) => {
  return updateObject(state, { lotsList: action.lots, loadingLots: false })
}

const fetchLotsByNeighbourhoodFail = state => {
  return updateObject(state, { loadingLots: false })
}

const fetchLotsByNeighbourhoodStart = state => {
  return updateObject(state, { loadingLots: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LOTS_BY_NEIGHBOURHOOD_SUCCESS:
      return fetchLotsByNeighbourhoodSucces(state, action)
    case actionTypes.FETCH_LOTS_BY_NEIGHBOURHOOD_FAIL:
      return fetchLotsByNeighbourhoodFail(state, action)
    case actionTypes.FETCH_LOTS_BY_NEIGHBOURHOOD_START:
      return fetchLotsByNeighbourhoodStart(state, action)
    default:
      return state
  }
}

export default reducer
