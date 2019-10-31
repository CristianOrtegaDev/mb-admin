import * as actionTypes from './actionTypes'
import {
  getActivitiesAPI,
  postNewActivitieAPI,
  getSpacesAPI,
  postNewSpaceAPI,
  postNewExceptionsAPI,
  getBookingRequestAPI
} from 'apiConstants'
import getApi from 'shared/api'

export const fetchActividadesSuccess = fetchedActivities => {
  return {
    type: actionTypes.FETCH_ACTIVIDADES_SUCCESS,
    actividades: fetchedActivities
  }
}

export const fetchActividadesFail = error => {
  return {
    type: actionTypes.FETCH_ACTIVIDADES_FAIL,
    error: error
  }
}

export const fetchActividadesStart = () => {
  return {
    type: actionTypes.FETCH_ACTIVIDADES_START
  }
}

export const fetchActividades = () => {
  return async (dispatch, getState) => {
    dispatch(fetchActividadesStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)

    try {
      const response = await api.get(getActivitiesAPI)

      dispatch(fetchActividadesSuccess(response.data))
    } catch (error) {
      dispatch(fetchActividadesFail(error))
    }
  }
}

//----------------------------------------------------------------

export const createActivitySuccess = newActivity => {
  return {
    type: actionTypes.CREATE_ACTIVIDAD_SUCCESS,
    newActivity: newActivity
  }
}

export const createActivityFail = error => {
  return {
    type: actionTypes.CREATE_ACTIVIDAD_FAIL,
    error: error
  }
}

export const createActivityStart = () => {
  return {
    type: actionTypes.CREATE_ACTIVIDAD_START
  }
}

export const createActivity = newActividad => {
  return async (dispatch, getState) => {
    dispatch(createActivityStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    return api
      .post(postNewActivitieAPI, newActividad)
      .then(res => {
        dispatch(createActivitySuccess(res.data))
      })
      .catch(err => {
        dispatch(createActivityFail(err))
      })
  }
}
//-----------------------------------------------------------------------

export const fetchSpacesSuccess = fetchedSpaces => {
  return {
    type: actionTypes.FETCH_SPACES_SUCCESS,
    spacesList: fetchedSpaces
  }
}

export const fetchSpacesFail = error => {
  return {
    type: actionTypes.FETCH_SPACES_FAIL,
    error: error
  }
}

export const fetchSpacesStart = () => {
  return {
    type: actionTypes.FETCH_SPACES_START
  }
}

export const fetchSpaces = id => {
  return async dispatch => {
    const api = await getApi()
    dispatch(fetchSpacesStart())
    api
      .get(`${getSpacesAPI}/${id}`)
      .then(res => {
        dispatch(fetchSpacesSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchSpacesFail(err))
      })
  }
}

//-----------------------------------------------------------------

export const createSpaceSuccess = () => {
  return {
    type: actionTypes.CREATE_SPACE_SUCCESS
  }
}

export const createSpaceFail = error => {
  return {
    type: actionTypes.CREATE_SPACE_FAIL,
    error: error
  }
}

export const createSpaceStart = () => {
  return {
    type: actionTypes.CREATE_SPACE_START
  }
}

export const createSpace = newSpace => {
  return async (dispatch, getState) => {
    dispatch(createSpaceStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    return api
      .post(postNewSpaceAPI, newSpace)
      .then(() => {
        dispatch(createSpaceSuccess())
      })
      .catch(err => {
        dispatch(createSpaceFail(err))
      })
  }
}

//-----------------------------------------------------------------

export const createExceptionsSuccess = () => {
  return {
    type: actionTypes.CREATE_EXCEPTIONS_SUCCESS
  }
}

export const createExceptionsFail = error => {
  return {
    type: actionTypes.CREATE_EXCEPTIONS_FAIL,
    error: error
  }
}

export const createExceptionsStart = () => {
  return {
    type: actionTypes.CREATE_EXCEPTIONS_START
  }
}

export const createExceptions = newExceptionData => {
  return async (dispatch, getState) => {
    dispatch(createExceptionsStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    return api
      .post(postNewExceptionsAPI, newExceptionData)
      .then(() => {
        dispatch(createExceptionsSuccess())
      })
      .catch(err => {
        dispatch(createExceptionsFail(err))
      })
  }
}

//------------------------------------------------------------------------
export const fetchBookingsRequestSuccess = fetchedBookings => {
  return {
    type: actionTypes.FETCH_BOOKING_REQUESTS_SUCCESS,
    fetchedBookings: fetchedBookings
  }
}

export const fetchBookingsRequestFail = error => {
  return {
    type: actionTypes.FETCH_BOOKING_REQUESTS_FAIL,
    error: error
  }
}

export const fetchBookingsRequestStart = () => {
  return {
    type: actionTypes.FETCH_BOOKING_REQUESTS_START
  }
}

export const fetchBookingsRequest = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchBookingsRequestStart())
    let {
      reservas,
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    let bookingsTake = reset ? 10 : reservas.bookingsTake
    const page = reservas.page

    try {
      const response = await api.get(`${getBookingRequestAPI}/${page}/${bookingsTake}`)
      let hasMoreUpdated = response.data.length === bookingsTake
      let takeUpdated = hasMoreUpdated ? bookingsTake + 10 : bookingsTake

      dispatch(
        fetchBookingsRequestSuccess({
          values: response.data,
          bookingsTake: takeUpdated,
          hasMoreBookings: hasMoreUpdated
        })
      )
    } catch (error) {
      dispatch(fetchBookingsRequestFail(error))
    }
  }
}
