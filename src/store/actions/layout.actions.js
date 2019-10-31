import * as actionTypes from './actionTypes'

export const updateLayout = data => ({
  type: actionTypes.UPDATE_LAYOUT,
  payload: data
})

export const toggleSidenav = () => ({
  type: actionTypes.TOGGLE_SIDENAV
})

export const setSidenavOpen = data => ({
  type: actionTypes.SET_SIDENAV_OPEN,
  payload: data
})

export const toggleSidenavVariant = data => ({
  type: actionTypes.TOGGLE_SIDENAV_VARIANT,
  payload: data
})

export const toggleNotifications = () => ({
  type: actionTypes.TOGGLE_NOTIFICATIONS
})
