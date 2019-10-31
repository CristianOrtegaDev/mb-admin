import axios from 'axios'
import { refreshTokenUrl } from 'apiConstants'
import { getCacheString } from 'utils/session'

export default (xBarrio, xToken) => {
  const tokenId = localStorage.getItem('tokenId')
  const accessToken = localStorage.getItem('accessToken')

  let headerConf = {
    Authorization: `Bearer ${tokenId}`,
    'Content-Type': 'application/json'
  }

  if (xBarrio) headerConf['x-barrio'] = xBarrio

  if (xToken) headerConf['x-access-token'] = accessToken

  let api = axios.create({
    headers: {
      common: headerConf
    }
  })

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        // Logout provisional
        localStorage.removeItem('accessToken')
        localStorage.removeItem('tokenId')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('user')

        window.location.reload()

        // TODO --> Uncomment this when refresh token is re-implemented in backend

        // const newAccessToken = await setApiToken(headerConf)

        // if (xToken) api.defaults.headers.common['x-access-token'] = `Bearer ${newAccessToken}`
        // originalRequest.headers['x-access-token'] = `Bearer ${newAccessToken}`

        // return await axios(originalRequest)
      }

      return Promise.reject(error)
    }
  )

  return api
}

export const setApiToken = async () => {
  const params = {}

  const refreshToken = getCacheString('refreshToken')

  const api = axios.create({
    headers: {
      common: {
        'x-refresh-token': refreshToken
      }
    }
  })

  const {
    data: {
      auth: { access_token }
    }
  } = await api.post(refreshTokenUrl, params)

  await localStorage.setItem('accessToken', access_token)

  return access_token
}
