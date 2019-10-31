import * as actionTypes from './actionTypes'
import {
  getRecibedMsjAPI,
  getSentMsjAPI,
  getUserNamesAPI,
  postPrivateMsjAPI,
  postPublicMsjAPI,
  getUnreadMsjAPI
} from '../../apiConstants'
import getApi from 'shared/api'

export const fetchMsjRecibidosSuccess = msj => {
  return {
    type: actionTypes.FETCH_MSJ_RECIBIDO_SUCCESS,
    recibidos: msj
  }
}

export const fetchMsjRecibidosFail = error => {
  return {
    type: actionTypes.FETCH_MSJ_RECIBIDO_FAIL,
    error: error
  }
}

export const fetchMsjRecibidosStart = () => {
  return {
    type: actionTypes.FETCH_MSJ_RECIBIDO_START
  }
}

export const fetchMsjRecibidos = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchMsjRecibidosStart())
    let {
      messages,
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()

    const api = await getApi(guid, true)

    let receivedTake = reset ? 10 : messages.receivedTake

    const page = messages.page
    try {
      // Fetching content
      const response = await api.get(`${getRecibedMsjAPI}${page}/${receivedTake}`)

      // Analizing response
      let hasMoreUpdated = response.data.length === receivedTake
      let takeUpdated = hasMoreUpdated ? receivedTake + 10 : receivedTake

      dispatch(
        fetchMsjRecibidosSuccess({
          values: response.data,
          receivedTake: takeUpdated,
          hasMoreReceived: hasMoreUpdated
        })
      )
    } catch (error) {
      dispatch(fetchMsjRecibidosFail(error))
    }
  }
}

export const fetchMsjEnviadosSuccess = fetchedMsj => {
  return {
    type: actionTypes.FETCH_MSJ_ENVIADOS_SUCCESS,
    enviados: fetchedMsj
  }
}

export const fetchMsjEnviadosFail = error => {
  return {
    type: actionTypes.FETCH_MSJ_ENVIADOS_FAIL,
    error: error
  }
}

export const fetchMsjEnviadosStart = () => {
  return {
    type: actionTypes.FETCH_MSJ_ENVIADOS_START
  }
}

export const fetchMsjEnviados = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchMsjEnviadosStart())
    let {
      messages,
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)

    let sentTake = reset ? 10 : messages.sentTake

    const page = messages.page

    try {
      // Fetching content
      const response = await api.get(`${getSentMsjAPI}${page}/${sentTake}`)

      // Analizing response
      let newValues = response.data

      let hasMoreUpdated = response.data.length === sentTake

      let takeUpdated = hasMoreUpdated ? sentTake + 10 : sentTake

      dispatch(
        fetchMsjEnviadosSuccess({
          values: newValues,
          sentTake: takeUpdated,
          hasMoreSent: hasMoreUpdated
        })
      )
    } catch (error) {
      dispatch(fetchMsjEnviadosFail(error))
    }
  }
}

//---------------------------------------------------------------------

export const fetchMsjUnreadSuccess = unread => {
  return {
    type: actionTypes.FETCH_MSJ_UNREAD_SUCCESS,
    unread: unread
  }
}

export const fetchMsjUnreadFail = error => {
  return {
    type: actionTypes.FETCH_MSJ_UNREAD_FAIL,
    error: error
  }
}

export const fetchMsjUnreadStart = () => {
  return {
    type: actionTypes.FETCH_MSJ_UNREAD_START
  }
}

export const fetchMsjUnread = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchMsjUnreadStart())
    let {
      messages,
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    let unreadTake = reset ? 10 : messages.unreadTake
    const page = messages.page

    try {
      const response = await api.get(`${getUnreadMsjAPI}/${page}/${unreadTake}`)
      let newValues = response.data
      let hasMoreUpdated = response.data.length === unreadTake
      let takeUpdated = hasMoreUpdated ? unreadTake + 10 : unreadTake
      dispatch(
        fetchMsjUnreadSuccess({
          values: newValues,
          unreadTake: takeUpdated,
          hasMoreUnread: hasMoreUpdated
        })
      )
    } catch (error) {
      dispatch(fetchMsjUnreadFail(error))
    }
  }
}

//---------------------------------------------------------------------

export const fetchUsersSuccess = users => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users
  }
}

export const fetchUsersFail = error => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  }
}

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  }
}

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUsersStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()

    const api = await getApi(guid, true)
    api
      .get(getUserNamesAPI)
      .then(res => {
        dispatch(fetchUsersSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchUsersFail(err))
      })
  }
}

//---------------------------------------------------------------------

export const createPrivateMsjSuccess = (id, newPrivateMsj) => {
  return {
    type: actionTypes.CREATE_NEW_PRIVATE_MSJ_SUCCESS,
    newPrivateMsjId: id,
    newPrivateMsj: newPrivateMsj
  }
}

export const createPrivateMsjFail = error => {
  return {
    type: actionTypes.CREATE_NEW_PRIVATE_MSJ_FAIL,
    error: error
  }
}

export const createPrivateMsjStart = () => {
  return {
    type: actionTypes.CREATE_NEW_PRIVATE_MSJ_START
  }
}

export const createPrivateMsj = newPrivateMsj => {
  return async (dispatch, getState) => {
    dispatch(createPrivateMsjStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    try {
      const response = await api.post(postPrivateMsjAPI, newPrivateMsj)
      dispatch(createPrivateMsjSuccess(response.data.id, newPrivateMsj))
    } catch (error) {
      dispatch(createPrivateMsjFail(error))
    }
  }
}

//---------------------------------------------------------------------

export const createPublicMsjSuccess = (id, newPublicMsj) => {
  return {
    type: actionTypes.CREATE_NEW_PUBLIC_MSJ_SUCCESS,
    newPublicMsjId: id,
    newPublicMsj: newPublicMsj
  }
}

export const createPublicMsjFail = error => {
  return {
    type: actionTypes.CREATE_NEW_PUBLIC_MSJ_FAIL,
    error: error
  }
}

export const createPublicMsjStart = () => {
  return {
    type: actionTypes.CREATE_NEW_PUBLIC_MSJ_START
  }
}

export const createPublicMsj = (newPublicMsj, neighbourhood) => {
  return async dispatch => {
    dispatch(createPublicMsjStart())
    const api = await getApi(neighbourhood, true)
    try {
      const response = await api.post(postPublicMsjAPI, newPublicMsj)
      dispatch(createPublicMsjSuccess(response.data.id, newPublicMsj))
    } catch (error) {
      dispatch(createPublicMsjFail(error))
    }
  }
}
