import * as actionTypes from './actionTypes'
import { getFamiliesByPropietaryIdAPI } from 'apiConstants'
import getApi from 'shared/api'

export const fetchRelativesSuccess = relatives => {
  return {
    type: actionTypes.FETCH_RELATIVES_SUCCESS,
    relatives: relatives
  }
}

export const fetchRelativesFail = error => {
  return {
    type: actionTypes.FETCH_RELATIVES_FAIL,
    error: error
  }
}

export const fetchRelativesStart = () => {
  return {
    type: actionTypes.FETCH_RELATIVES_START
  }
}

export const fetchRelatives = id => {
  return async (dispatch, getState) => {
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    dispatch(fetchRelativesStart())
    return api
      .get(getFamiliesByPropietaryIdAPI + id)
      .then(res => {
        dispatch(fetchRelativesSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchRelativesFail(err))
      })
  }
}
