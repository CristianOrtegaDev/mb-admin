import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  defaultActivitiesList: [],
  loadingDefaultActivities: false,
  errorFetchDefaultActivities: false,
  defaultCategoriesList: [],
  loadingDefaultCategories: false,
  errorFetchDefaultCategories: false
}

const fetchDefaultActivitiesSuccess = (state, action) => {
  return updateObject(state, {
    defaultActivitiesList: action.activities,
    loadingDefaultActivities: false
  })
}

const fetchDefaultActivitiesFail = state => {
  return updateObject(state, { loadingDefaultActivities: false, errorFetchDefaultActivities: true })
}

const fetchDefaultActivitiesStart = state => {
  return updateObject(state, { loadingDefaultActivities: true })
}

const fetchDefaultCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    defaultCategoriesList: action.categories,
    loadingDefaultCategories: false
  })
}

const fetchDefaultCategoriesFail = state => {
  return updateObject(state, { loadingDefaultCategories: false, errorFetchDefaultCategories: true })
}

const fetchDefaultCategoriesStart = state => {
  return updateObject(state, { loadingDefaultCategories: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DEFAULT_ACTIVITIES_SUCCESS:
      return fetchDefaultActivitiesSuccess(state, action)
    case actionTypes.FETCH_DEFAULT_ACTIVITIES_FAIL:
      return fetchDefaultActivitiesFail(state, action)
    case actionTypes.FETCH_DEFAULT_ACTIVITIES_START:
      return fetchDefaultActivitiesStart(state, action)

    case actionTypes.FETCH_DEFAULT_CATEGORIES_SUCCESS:
      return fetchDefaultCategoriesSuccess(state, action)
    case actionTypes.FETCH_DEFAULT_CATEGORIES_FAIL:
      return fetchDefaultCategoriesFail(state, action)
    case actionTypes.FETCH_DEFAULT_CATEGORIES_START:
      return fetchDefaultCategoriesStart(state, action)

    default:
      return state
  }
}

export default reducer
