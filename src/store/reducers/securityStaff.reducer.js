import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  staffList: [],
  loadingNewStaff: false,
  createdNewStaff: false,
  errorNewStaff: false,
  loading: false,
  created: false,
  filter: 'name'
}

const fetchSecurityStaffSuccess = (state, action) => {
  return updateObject(state, { staffList: action.staff, loading: false, error: false })
}

const fetchSecurityStaffFail = state => {
  return updateObject(state, { created: false, error: true, loading: false })
}

const fetchSecurityStaffStart = state => {
  return updateObject(state, { loading: true, error: false })
}

const createSecurityStaffStart = state => {
  return updateObject(state, { loadingNewStaff: true, createdNewStaff: false })
}

const createSecurityStaffSuccess = state => {
  return updateObject(state, {
    loadingNewStaff: false,
    createdNewStaff: true
  })
}

const createSecurityStaffFail = state => {
  return updateObject(state, {
    createdNewStaff: false,
    loadingNewStaff: false,
    errorNewStaff: true
  })
}

const filterSearchChanged = (state, action) => {
  return updateObject(state, { filter: action.filter })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SECURITYSTAFF_SUCCESS:
      return fetchSecurityStaffSuccess(state, action)
    case actionTypes.FETCH_SECURITYSTAFF_FAIL:
      return fetchSecurityStaffFail(state, action)
    case actionTypes.FETCH_SECURITYSTAFF_START:
      return fetchSecurityStaffStart(state, action)

    case actionTypes.CREATE_SECURITYSTAFF_SUCCESS:
      return createSecurityStaffSuccess(state, action)
    case actionTypes.CREATE_SECURITYSTAFF_FAIL:
      return createSecurityStaffFail(state, action)
    case actionTypes.CREATE_SECURITYSTAFF_START:
      return createSecurityStaffStart(state, action)

    case actionTypes.FILTER_SEARCH_CHANGED:
      return filterSearchChanged(state, action)
    default:
      return state
  }
}

export default reducer
