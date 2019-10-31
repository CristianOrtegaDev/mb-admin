import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  invitadosList: [],
  loading: false,
  guestsByUsername: [],
  loadingGuestsByUsername: false,
  error: false,
  guestsByRelativeUsername: [],
  loadingGuestsByRelativeUsername: false,
  page: 0,
  take: 10,
  hasMore: true,
  filteredGuests: []
}

const fetchInvitacionesSuccess = (state, action) =>
  updateObject(state, {
    invitadosList: action.invitados.values,
    take: action.invitados.take,
    hasMore: action.invitados.hasMore,
    loading: false
  })

const fetchInvitacionesFail = state => updateObject(state, { loading: false })

const fetchInvitacionesStart = state => updateObject(state, { loading: true })

const fetchGuestsSuccess = (state, action) => {
  return updateObject(state, {
    guestsByUsername: action.guestsByUsername,
    loadingGuestsByUsername: false
  })
}

const fetchGuestsFail = state => {
  return updateObject(state, { loadingGuestsByUsername: false })
}

const fetchGuestsStart = state => {
  return updateObject(state, { filteredGuests: [], loadingGuestsByUsername: true })
}

const fetchFilteredGuestsStart = state =>
  updateObject(state, { filteredGuests: [], loading: true, error: false })

const fetchFilteredGuestsSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    filteredGuests: action.invitados
  })

const fetchFilteredGuestsFail = state =>
  updateObject(state, { error: true, hasMore: false, loading: false })
//-----------------------------------------------------------------------

const fetchRelativeGuestsSuccess = (state, action) => {
  return updateObject(state, {
    guestsByRelativeUsername: action.guestsByRelativeUsername,
    loadingGuestsByRelativeUsername: false
  })
}

const fetchRelativeGuestsFail = state => {
  return updateObject(state, { loadingGuestsByRelativeUsername: false })
}

const fetchRelativeGuestsStart = state => {
  return updateObject(state, { loadingGuestsByRelativeUsername: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INVITACIONES_SUCCESS:
      return fetchInvitacionesSuccess(state, action)
    case actionTypes.FETCH_INVITACIONES_FAIL:
      return fetchInvitacionesFail(state, action)
    case actionTypes.FETCH_INVITACIONES_START:
      return fetchInvitacionesStart(state, action)

    case actionTypes.FETCH_GUESTS_SUCCESS:
      return fetchGuestsSuccess(state, action)
    case actionTypes.FETCH_GUESTS_FAIL:
      return fetchGuestsFail(state, action)
    case actionTypes.FETCH_GUESTS_START:
      return fetchGuestsStart(state, action)

    case actionTypes.FETCH_FILTERED_GUESTS_START:
      return fetchFilteredGuestsStart(state, action)
    case actionTypes.FETCH_FILTERED_GUESTS_SUCCESS:
      return fetchFilteredGuestsSuccess(state, action)
    case actionTypes.FETCH_FILTERED_GUESTS_FAIL:
      return fetchFilteredGuestsFail(state, action)

    case actionTypes.FETCH_RELATIVE_GUESTS_SUCCESS:
      return fetchRelativeGuestsSuccess(state, action)
    case actionTypes.FETCH_RELATIVE_GUESTS_FAIL:
      return fetchRelativeGuestsFail(state, action)
    case actionTypes.FETCH_RELATIVE_GUESTS_START:
      return fetchRelativeGuestsStart(state, action)
    default:
      return state
  }
}

export default reducer
