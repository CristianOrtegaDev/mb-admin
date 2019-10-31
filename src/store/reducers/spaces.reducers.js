import { handleActions } from 'redux-actions'
import {
  fetchSpacesStart,
  fetchSpacesSuccess,
  fetchSpacesError,
  submitSpaceStart,
  submitSpaceSuccess,
  submitSpaceError
} from 'store/actions/spaces.actions'

const defaultState = {
  values: [],
  error: null,
  isFetching: false,
  isSubmitting: false
}

const reducer = handleActions(
  {
    // Fetch spaces
    [fetchSpacesStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchSpacesSuccess]: (
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
    [fetchSpacesError]: (state, { payload: { error } }) => ({
      ...state,
      isFetching: false,
      error
    }),
    // Submit space
    [submitSpaceStart]: state => ({
      ...state,
      isSubmitting: true,
      error: null
    }),
    [submitSpaceSuccess]: state => ({
      ...state,
      isSubmitting: false,
      error: null
    }),
    [submitSpaceError]: (state, { payload: { error } }) => ({
      ...state,
      isSubmitting: false,
      error
    })
  },
  defaultState
)

export default reducer
