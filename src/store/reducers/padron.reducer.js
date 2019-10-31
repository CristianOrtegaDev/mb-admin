import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  loading: false,
  created: false,
  proprietaryList: [],
  loadingNewProprietary: false,
  createdNewProprietary: false,
  errorNewProprietary: false,
  page: 0,
  take: 10,
  hasMore: true
}

const fetchPadronSuccess = (state, action) => {
  return updateObject(state, {
    proprietaryList: action.padron.values,
    take: action.padron.take,
    hasMore: action.padron.hasMore,
    loading: false
  })
}

const fetchPadronFail = state => {
  return updateObject(state, { created: false })
}

const fetchPadronStart = state => {
  return updateObject(state, { loading: true })
}

//----------------------------------------------------------------

const createProprietaryStart = state => {
  return updateObject(state, { loadingNewProprietary: true, errorNewProprietary: false })
}

const createProprietarySuccess = state => {
  return updateObject(state, {
    loadingNewProprietary: false,
    createdNewProprietary: true,
    errorNewProprietary: false
  })
}

const createProprietaryFail = state => {
  return updateObject(state, {
    createdNewProprietary: false,
    loadingNewProprietary: false,
    errorNewProprietary: true
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PADRON_SUCCESS:
      return fetchPadronSuccess(state, action)
    case actionTypes.FETCH_PADRON_FAIL:
      return fetchPadronFail(state, action)
    case actionTypes.FETCH_PADRON_START:
      return fetchPadronStart(state, action)

    case actionTypes.CREATE_PROPRIETARY_SUCCESS:
      return createProprietarySuccess(state, action)
    case actionTypes.CREATE_PROPRIETARY_FAIL:
      return createProprietaryFail(state, action)
    case actionTypes.CREATE_PROPRIETARY_START:
      return createProprietaryStart(state, action)
    default:
      return state
  }
}

export default reducer
