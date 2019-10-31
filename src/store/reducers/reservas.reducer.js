import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  actividadesList: [],
  spacesList: [],
  loadingSpaces: false,
  loadingActividades: false,
  createdActivity: false,
  loadingNewActivity: false,
  errorNewActivity: false,
  createdSpace: false,
  loadingNewSpace: false,
  errorNewSpace: false,
  exceptionsList: false,
  loadingExeptions: false,
  createdException: false,
  loadingNewException: false,
  errorNewException: false,
  fetchedBookings: [],
  loadingBookings: false,

  page: 0,
  hasMoreBookings: true,
  bookingsTake: 10
}

const fetchActividadesSuccess = (state, action) => {
  return updateObject(state, {
    actividadesList: action.actividades,
    loadingActividades: false
  })
}

const fetchActividadesFail = state => {
  return updateObject(state, { loadingActividades: false })
}

const fetchActividadesStart = state => {
  return updateObject(state, { loadingActividades: true })
}
//-----------------------------------------------------------------
const createActivitySuccess = (state, action) => {
  const newActivity = updateObject(action.newActivity)
  return updateObject(state, {
    loadingNewActivity: false,
    createdActivity: true,
    actividadesList: state.actividadesList.concat(newActivity),
    errorNewActivity: false
  })
}

const createActivityFail = state => {
  return updateObject(state, {
    loadingNewActivity: false,
    errorNewActivity: true
  })
}

const createActivityStart = state => {
  return updateObject(state, { loadingNewActivity: true, errorNewActivity: false })
}

//-----------------------------------------------------------------
const fetchSpacesSuccess = (state, action) => {
  return updateObject(state, {
    spacesList: action.spacesList,
    loadingSpaces: false
  })
}

const fetchSpacesFail = state => {
  return updateObject(state, { loadingSpaces: false })
}

const fetchSpacesStart = state => {
  return updateObject(state, { loadingSpaces: true })
}
//------------------------------------------------------

const createSpaceSuccess = state => {
  return updateObject(state, {
    loadingNewSpace: false,
    createdSpace: true,
    errorNewSpace: false
  })
}

const createSpaceFail = state => {
  return updateObject(state, { loadingNewSpace: false, errorNewSpace: true })
}

const createSpaceStart = state => {
  return updateObject(state, { loadingNewSpace: true, errorNewSpace: false })
}
//------------------------------------------------------

const createExceptionsSuccess = state => {
  return updateObject(state, {
    loadingNewException: false,
    createdException: true,
    errorNewException: false
  })
}

const createExceptionsFail = state => {
  return updateObject(state, {
    loadingNewException: false,
    errorNewException: true
  })
}

const createExceptionsStart = state => {
  return updateObject(state, { loadingNewException: true, errorNewException: false })
}

//----------------------------------------------------------
const fetchBookingsRequestSuccess = (state, action) => {
  return updateObject(state, {
    fetchedBookings: action.fetchedBookings.values,
    loadingBookings: false,
    hasMoreBookings: action.fetchedBookings.hasMoreBookings,
    bookingsTake: action.fetchedBookings.bookingsTake
  })
}

const fetchBookingsRequestFail = state => {
  return updateObject(state, { loadingBookings: false })
}

const fetchBookingsRequestStart = state => {
  return updateObject(state, { loadingBookings: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ACTIVIDADES_SUCCESS:
      return fetchActividadesSuccess(state, action)
    case actionTypes.FETCH_ACTIVIDADES_FAIL:
      return fetchActividadesFail(state, action)
    case actionTypes.FETCH_ACTIVIDADES_START:
      return fetchActividadesStart(state, action)

    case actionTypes.CREATE_ACTIVIDAD_SUCCESS:
      return createActivitySuccess(state, action)
    case actionTypes.CREATE_ACTIVIDAD_FAIL:
      return createActivityFail(state, action)
    case actionTypes.CREATE_ACTIVIDAD_START:
      return createActivityStart(state, action)

    case actionTypes.FETCH_SPACES_SUCCESS:
      return fetchSpacesSuccess(state, action)
    case actionTypes.FETCH_SPACES_FAIL:
      return fetchSpacesFail(state, action)
    case actionTypes.FETCH_SPACES_START:
      return fetchSpacesStart(state, action)

    case actionTypes.CREATE_SPACE_SUCCESS:
      return createSpaceSuccess(state, action)
    case actionTypes.CREATE_SPACE_FAIL:
      return createSpaceFail(state, action)
    case actionTypes.CREATE_SPACE_START:
      return createSpaceStart(state, action)

    case actionTypes.CREATE_EXCEPTIONS_SUCCESS:
      return createExceptionsSuccess(state, action)
    case actionTypes.CREATE_EXCEPTIONS_FAIL:
      return createExceptionsFail(state, action)
    case actionTypes.CREATE_EXCEPTIONS_START:
      return createExceptionsStart(state, action)

    case actionTypes.FETCH_BOOKING_REQUESTS_SUCCESS:
      return fetchBookingsRequestSuccess(state, action)
    case actionTypes.FETCH_BOOKING_REQUESTS_FAIL:
      return fetchBookingsRequestFail(state, action)
    case actionTypes.FETCH_BOOKING_REQUESTS_START:
      return fetchBookingsRequestStart(state, action)

    default:
      return state
  }
}

export default reducer
