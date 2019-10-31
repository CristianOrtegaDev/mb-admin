import * as actionTypes from './actionTypes'
import { getDefaultActivities, getDefaultCategories } from 'apiConstants'
import getApi from 'shared/api'

export const fetchDefaultActivitiesSuccess = activities => {
  return {
    type: actionTypes.FETCH_DEFAULT_ACTIVITIES_SUCCESS,
    activities: activities
  }
}

export const fetchDefaultActivitiesFail = error => {
  return {
    type: actionTypes.FETCH_DEFAULT_ACTIVITIES_FAIL,
    error: error
  }
}

export const fetchDefaultActivitiesStart = () => {
  return {
    type: actionTypes.FETCH_DEFAULT_ACTIVITIES_START
  }
}

export const fetchDefaultActivities = () => {
  return async dispatch => {
    const api = await getApi()
    dispatch(fetchDefaultActivitiesStart())
    api
      .get(`${getDefaultActivities}/${0}/${1000}`)
      .then(res => {
        dispatch(fetchDefaultActivitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchDefaultActivitiesFail(err))
      })
  }
}

export const fetchDefaultCategoriesSuccess = categories => {
  return {
    type: actionTypes.FETCH_DEFAULT_CATEGORIES_SUCCESS,
    categories: categories
  }
}

export const fetchDefaultCategoriesFail = error => {
  return {
    type: actionTypes.FETCH_DEFAULT_CATEGORIES_FAIL,
    error: error
  }
}

export const fetchDefaultCategoriesStart = () => {
  return {
    type: actionTypes.FETCH_DEFAULT_CATEGORIES_START
  }
}

export const fetchDefaultCategories = () => {
  return async dispatch => {
    const api = await getApi()
    dispatch(fetchDefaultCategoriesStart())
    api
      .get(`${getDefaultCategories}/${0}/${1000}`)
      .then(res => {
        dispatch(fetchDefaultCategoriesSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchDefaultCategoriesFail(err))
      })
  }
}
