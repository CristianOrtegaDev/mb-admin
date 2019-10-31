import { createActions } from 'redux-actions'
import getApi from 'shared/api'
import { activeTimesAPI } from 'apiConstants'

const { fetchActiveTimesStart, fetchActiveTimesSuccess, fetchActiveTimesError } = createActions({
  FETCH_ACTIVE_TIMES_START: () => {},
  FETCH_ACTIVE_TIMES_SUCCESS: data => ({ data }),
  FETCH_ACTIVE_TIMES_ERROR: error => ({ error })
})

const fetchActiveTimes = (spaceId, from) => {
  return async dispatch => {
    dispatch(fetchActiveTimesStart())
    const api = await getApi()
    try {
      const response = await api.get(`${activeTimesAPI}/${spaceId}/date-range/${from}`)
      dispatch(fetchActiveTimesSuccess({ values: response.data }))
    } catch (error) {
      dispatch(fetchActiveTimesError(error))
    }
  }
}

export { fetchActiveTimes, fetchActiveTimesStart, fetchActiveTimesSuccess, fetchActiveTimesError }
