export const getUserInfo = () => getCacheObject('user')

export const isUserLoggedIn = () => getCacheString('tokenId')

export const saveCacheUserInfo = userInfo => localStorage.setItem('user', JSON.stringify(userInfo))

export const cacheReader = () => {
  const cachedReducers = {}

  const cachedUserInformation = getUserInfo()
  if (cachedUserInformation) cachedReducers['userInfo'] = cachedUserInformation

  return cachedReducers
}

export const getCacheString = key => localStorage.getItem(key)

export const getCacheObject = key => JSON.parse(localStorage.getItem(key))
