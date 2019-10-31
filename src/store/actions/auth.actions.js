import * as actionTypes from './actionTypes'
import { authAPI } from '../../apiConstants'
import getApi from 'shared/api'
import { hasLoginNetworkError } from 'utils/networkError'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('tokenId')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('user')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password) => {
  return async dispatch => {
    const api = await getApi()
    dispatch(authStart())
    const authData = {
      username: email,
      password: password
    }

    return api
      .post(authAPI, authData)
      .then(async response => {
        await localStorage.setItem('accessToken', response.data.auth.access_token)
        await localStorage.setItem('tokenId', response.data.auth.token_id)
        await localStorage.setItem('refreshToken', response.data.auth.refresh_token)
        await localStorage.setItem('loginDate', new Date())

        const userInfo = response.data.user
        userInfo.neighbourhoods = response.data.neighbourhoods.reverse()
        userInfo.selectedNeighbourhood = response.data.neighbourhoods[0]
        await localStorage.setItem('user', JSON.stringify(userInfo))

        dispatch(authSuccess(response.data.auth.token_id, userInfo))
      })
      .catch(error => {
        dispatch(authFail(hasLoginNetworkError(error)))
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('tokenId')
    const loginDate = new Date(localStorage.getItem('loginDate'))
    const actualDate = new Date()
    if (!token || loginDate.getDay() !== actualDate.getDay()) {
      dispatch(logout())
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      dispatch(authSuccess(token, user))
    }
  }
}
