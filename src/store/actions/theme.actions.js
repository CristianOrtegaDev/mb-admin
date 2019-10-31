import * as actionTypes from './actionTypes'

export const changeTheme = theme => ({
  type: actionTypes.CHANGE_THEME,
  payload: theme
})

export const changeSidenavToolbarBackground = color => ({
  type: actionTypes.CHANGE_SIDENAV_TOOLBAR_BACKGROUND,
  payload: color
})

export const changeSidenavToolbarText = color => ({
  type: actionTypes.CHANGE_SIDENAV_TOOLBAR_TEXT,
  payload: color
})

export const changeSidenavPaletteType = type => ({
  type: actionTypes.CHANGE_SIDENAV_PALETTE_TYPE,
  payload: type
})

export const changeContentToolbarBackground = color => ({
  type: actionTypes.CHANGE_CONTENT_TOOLBAR_BACKGROUND,
  payload: color
})

export const changeContentToolbarText = color => ({
  type: actionTypes.CHANGE_CONTENT_TOOLBAR_TEXT,
  payload: color
})

export const changeContentPaletteType = type => ({
  type: actionTypes.CHANGE_CONTENT_PALETTE_TYPE,
  payload: type
})

export const changePrimaryPaletteBackground = color => ({
  type: actionTypes.CHANGE_PRIMARY_PALETTE_BACKGROUND,
  payload: color
})

export const changePrimaryPaletteText = color => ({
  type: actionTypes.CHANGE_PRIMARY_PALETTE_TEXT,
  payload: color
})

export const changeSecondaryPaletteBackground = color => ({
  type: actionTypes.CHANGE_SECONDARY_PALETTE_BACKGROUND,
  payload: color
})

export const changeSecondaryPaletteText = color => ({
  type: actionTypes.CHANGE_SECONDARY_PALETTE_TEXT,
  payload: color
})

export const changeThemeDirection = dir => ({
  type: actionTypes.CHANGE_THEME_DIRECTION,
  payload: dir
})
