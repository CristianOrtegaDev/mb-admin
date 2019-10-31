import { handleActions } from 'redux-actions'
import {
  fetchActivitiesStart,
  fetchActivitiesSuccess,
  fetchActivitiesError,
  submitActivityStart,
  submitActivitySuccess,
  submitActivityError
} from 'store/actions/activities.actions'

const defaultState = {
  values: null,
  error: null,
  isFetching: false,
  isSubmitting: false
}

const reducer = handleActions(
  {
    // Fetch activities
    [fetchActivitiesStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchActivitiesSuccess]: (
      state,
      {
        payload: {
          data: { values }
        }
      }
    ) => ({
      ...state,
      values,
      isFetching: false,
      error: null
    }),
    [fetchActivitiesError]: (state, { error }) => ({
      ...state,
      isFetching: false,
      error
    }),
    // Submit activity
    [submitActivityStart]: state => ({
      ...state,
      isSubmitting: true,
      error: false
    }),
    [submitActivitySuccess]: state => ({
      ...state,
      isSubmitting: false,
      error: null
    }),
    [submitActivityError]: (state, { error }) => ({
      ...state,
      isSubmitting: false,
      error
    })
  },
  defaultState
)

export default reducer
