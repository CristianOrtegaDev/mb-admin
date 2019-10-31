import * as actionTypes from './actionTypes'
import { getInvitationsAPI, getGuestsAPI, getFilteredGuestsAPI } from '../../apiConstants'
import getApi from 'shared/api'

export const fetchGuestsSuccess = guests => {
  return {
    type: actionTypes.FETCH_GUESTS_SUCCESS,
    guestsByUsername: guests
  }
}

export const fetchGuestsFail = error => {
  return {
    type: actionTypes.FETCH_GUESTS_FAIL,
    error: error
  }
}

export const fetchGuestsStart = () => {
  return {
    type: actionTypes.FETCH_GUESTS_START
  }
}

export const fetchGuests = username => {
  return async (dispatch, getState) => {
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()

    const api = await getApi(guid)
    dispatch(fetchGuestsStart())
    return api
      .get(getGuestsAPI + username)
      .then(res => {
        dispatch(fetchGuestsSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchGuestsFail(err))
      })
  }
}
//------------------------------------------------------
export const fetchRelativeGuestsSuccess = guests => {
  return {
    type: actionTypes.FETCH_RELATIVE_GUESTS_SUCCESS,
    guestsByRelativeUsername: guests
  }
}

export const fetchRelativeGuestsFail = error => {
  return {
    type: actionTypes.FETCH_RELATIVE_GUESTS_FAIL,
    error: error
  }
}

export const fetchRelativeGuestsStart = () => {
  return {
    type: actionTypes.FETCH_RELATIVE_GUESTS_START
  }
}

export const fetchRelativeGuests = username => {
  return async (dispatch, getState) => {
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    dispatch(fetchRelativeGuestsStart())
    api
      .get(getGuestsAPI + username)
      .then(res => {
        dispatch(fetchRelativeGuestsSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchRelativeGuestsFail(err))
      })
  }
}

//------------------------------------------------------

export const fetchInvitacionesSuccess = invitados => {
  return {
    type: actionTypes.FETCH_INVITACIONES_SUCCESS,
    invitados: invitados
  }
}

export const fetchInvitacionesFail = error => {
  return {
    type: actionTypes.FETCH_INVITACIONES_FAIL,
    error: error
  }
}

export const fetchInvitacionesStart = () => {
  return {
    type: actionTypes.FETCH_INVITACIONES_START
  }
}

export const fetchInvitaciones = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchInvitacionesStart())
    let {
      invitados,
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()

    const api = await getApi(guid, true)

    let take = reset ? 10 : invitados.take
    let page = invitados.page

    try {
      // Fetching content
      const response = await api.get(`${getInvitationsAPI}${page}/${take}`)

      // Analizing response
      let hasMoreUpdated = response.data.length === take
      let takeUpdated = hasMoreUpdated ? take + 10 : take

      dispatch(
        fetchInvitacionesSuccess({
          values: response.data,
          take: takeUpdated,
          hasMore: hasMoreUpdated
        })
      )
    } catch (error) {
      dispatch(fetchInvitacionesFail(error))
    }
  }
}

// ------------------------------------

export const fetchFilteredGuestsStart = () => {
  return {
    type: actionTypes.FETCH_FILTERED_GUESTS_START
  }
}

export const fetchFilteredGuestsSuccess = invitados => {
  return {
    type: actionTypes.FETCH_FILTERED_GUESTS_SUCCESS,
    invitados
  }
}

export const fetchFilteredGuestsFail = error => {
  return {
    type: actionTypes.FETCH_FILTERED_GUESTS_FAIL,
    error
  }
}

export const fetchFilteredGuests = searchTerm => {
  return async (dispatch, getState) => {
    dispatch(fetchFilteredGuestsStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, false)
    try {
      const response = await api.get(`${getFilteredGuestsAPI}?keyword=${searchTerm}`)
      dispatch(fetchFilteredGuestsSuccess(response.data))
    } catch (error) {
      dispatch(fetchFilteredGuestsFail(error))
    }
  }
}
