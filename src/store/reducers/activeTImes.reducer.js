import { handleActions } from 'redux-actions'
import {
  fetchActiveTimesStart,
  fetchActiveTimesSuccess,
  fetchActiveTimesError
} from 'store/actions/activeTimes.actions'
import activeTimesMock from './activeTimesMock'

const reservationsMock = [
  {
    date: 'dateString',
    day_of_week: 0,
    active_times: activeTimesMock
  },
  {
    date: 'dateString',
    day_of_week: 1,
    active_times: []
  },
  {
    date: 'dateString',
    day_of_week: 2,
    active_times: activeTimesMock
  },
  {
    date: 'dateString',
    day_of_week: 3,
    active_times: []
  },
  {
    date: 'dateString',
    day_of_week: 4,
    active_times: activeTimesMock
  },
  {
    date: 'dateString',
    day_of_week: 5,
    active_times: []
  },
  {
    date: 'dateString',
    day_of_week: 6,
    active_times: activeTimesMock
  }
]

const defaultState = {
  values: reservationsMock,
  error: null,
  isFetching: false
}

const reducer = handleActions(
  {
    // Fetch activities
    [fetchActiveTimesStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchActiveTimesSuccess]: (
      state,
      {
        payload: {
          data: { values }
        }
      }
    ) => ({
      ...state,
      values: values,
      isFetching: false,
      error: null
    }),
    [fetchActiveTimesError]: (state, { error }) => ({
      ...state,
      isFetching: false,
      error
    })
  },
  defaultState
)

export default reducer
