import { createActions } from 'redux-actions'
import getApi from 'shared/api'
import { getActivitiesAPI, postNewActivitieAPI } from 'apiConstants'

const {
  fetchActivitiesStart,
  fetchActivitiesSuccess,
  fetchActivitiesError,
  submitActivityStart,
  submitActivitySuccess,
  submitActivityError
} = createActions({
  FETCH_ACTIVITIES_START: () => {},
  FETCH_ACTIVITIES_SUCCESS: data => ({ data }),
  FETCH_ACTIVITIES_ERROR: error => ({ error }),
  SUBMIT_ACTIVITY_START: () => {},
  SUBMIT_ACTIVITY_SUCCESS: data => ({ data }),
  SUBMIT_ACTIVITY_ERROR: error => ({ error })
})

const fetchActivities = () => {
  return async (dispatch, getState) => {
    dispatch(fetchActivitiesStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    try {
      const response = await api.get(getActivitiesAPI)
      dispatch(fetchActivitiesSuccess({ values: response.data }))
    } catch (error) {
      dispatch(fetchActivitiesError(error))
    }
  }
}

const submitActivity = newActivity => {
  return async (dispatch, getState) => {
    dispatch(submitActivityStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    try {
      const response = await api.post(postNewActivitieAPI, newActivity)
      dispatch(submitActivitySuccess(response.data))
    } catch (error) {
      dispatch(submitActivityError(error))
    }
  }
}

export {
  fetchActivities,
  fetchActivitiesStart,
  fetchActivitiesSuccess,
  fetchActivitiesError,
  submitActivityStart,
  submitActivitySuccess,
  submitActivityError,
  submitActivity
}
