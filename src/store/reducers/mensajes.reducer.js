import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  recibidosList: [],
  loadingRecibidos: false,
  enviadosList: [],
  loadingEnviados: false,
  users: [],
  loadingUsers: false,
  unreadList: [],
  loadingUnread: false,

  loading: false,
  created: false,

  page: 0,
  sentTake: 10,
  hasMoreSent: true,
  receivedTake: 10,
  hasMoreReceived: true,
  unreadTake: 10,
  hasMoreUnread: true
}

const fetchMsjRecibidosStart = state => {
  return updateObject(state, { loadingRecibidos: true })
}

const fetchMsjRecibidosSuccess = (state, action) =>
  updateObject(state, {
    recibidosList: action.recibidos.values,
    receivedTake: action.recibidos.receivedTake,
    hasMoreReceived: action.recibidos.hasMoreReceived,
    loadingRecibidos: false
  })

const fetchMsjRecibidosFail = state => {
  return updateObject(state, { loadingRecibidos: false, created: false })
}

const fetchMsjEnviadosStart = state => {
  return updateObject(state, { loadingEnviados: true })
}

const fetchMsjEnviadosSuccess = (state, action) =>
  updateObject(state, {
    enviadosList: action.enviados.values,
    sentTake: action.enviados.sentTake,
    hasMoreSent: action.enviados.hasMoreSent,
    loadingEnviados: false
  })

const fetchMsjEnviadosFail = state => {
  return updateObject(state, { loadingEnviados: false, created: false })
}

const fetchUsersStart = state => {
  return updateObject(state, { loadingUsers: true })
}

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loadingUsers: false
  })
}

const fetchUsersFail = state => {
  return updateObject(state, { created: false, loadingUsers: false })
}

const createPrivateMsjStart = state => {
  return updateObject(state, { loading: true })
}

const createPrivateMsjSuccess = (state, action) => {
  const newMensaje = updateObject(action.newPrivateMsj, {
    id: action.newPrivateMsjId
  })
  return updateObject(state, {
    loading: false,
    created: true,
    enviadosList: state.enviadosList.concat(newMensaje)
  })
}

const createPrivateMsjFail = state => {
  return updateObject(state, { created: false, loading: false })
}

const createPublicMsjStart = state => {
  return updateObject(state, { loading: true })
}

const createPublicMsjSuccess = (state, action) => {
  const newMensaje = updateObject(action.newPublicMsj, {
    id: action.newPublicMsjId
  })
  return updateObject(state, {
    loading: false,
    created: true,
    enviadosList: state.enviadosList.concat(newMensaje)
  })
}

const createPublicMsjFail = state => {
  return updateObject(state, { created: false, loading: false })
}

//-----------------------------------------------------------------------------

const fetchMsjUnreadStart = state => {
  return updateObject(state, { loadingUnread: true })
}

const fetchMsjUnreadSuccess = (state, action) =>
  updateObject(state, {
    unreadList: action.unread.values,
    unreadTake: action.unread.unreadTake,
    hasMoreUnread: action.unread.hasMoreUnread,
    loadingUnread: false
  })

const fetchMsjUnreadFail = state => {
  return updateObject(state, { loadingUnread: false })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MSJ_RECIBIDO_SUCCESS:
      return fetchMsjRecibidosSuccess(state, action)
    case actionTypes.FETCH_MSJ_RECIBIDO_FAIL:
      return fetchMsjRecibidosFail(state, action)
    case actionTypes.FETCH_MSJ_RECIBIDO_START:
      return fetchMsjRecibidosStart(state, action)

    case actionTypes.CREATE_NEW_PRIVATE_MSJ_SUCCESS:
      return createPrivateMsjSuccess(state, action)
    case actionTypes.CREATE_NEW_PRIVATE_MSJ_FAIL:
      return createPrivateMsjFail(state, action)
    case actionTypes.CREATE_NEW_PRIVATE_MSJ_START:
      return createPrivateMsjStart(state, action)

    case actionTypes.FETCH_MSJ_ENVIADOS_SUCCESS:
      return fetchMsjEnviadosSuccess(state, action)
    case actionTypes.FETCH_MSJ_ENVIADOS_FAIL:
      return fetchMsjEnviadosFail(state, action)
    case actionTypes.FETCH_MSJ_ENVIADOS_START:
      return fetchMsjEnviadosStart(state, action)

    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action)
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUsersFail(state, action)
    case actionTypes.FETCH_USERS_START:
      return fetchUsersStart(state, action)

    case actionTypes.CREATE_NEW_PUBLIC_MSJ_SUCCESS:
      return createPublicMsjSuccess(state, action)
    case actionTypes.CREATE_NEW_PUBLIC_MSJ_FAIL:
      return createPublicMsjFail(state, action)
    case actionTypes.CREATE_NEW_PUBLIC_MSJ_START:
      return createPublicMsjStart(state, action)

    case actionTypes.FETCH_MSJ_UNREAD_SUCCESS:
      return fetchMsjUnreadSuccess(state, action)
    case actionTypes.FETCH_MSJ_UNREAD_FAIL:
      return fetchMsjUnreadFail(state, action)
    case actionTypes.FETCH_MSJ_UNREAD_START:
      return fetchMsjUnreadStart(state, action)

    default:
      return state
  }
}

export default reducer
