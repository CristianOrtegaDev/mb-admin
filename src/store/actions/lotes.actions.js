import * as actionTypes from './actionTypes'
import { getFunctionalUnitAPI } from 'apiConstants'
import getApi from 'shared/api'

export const fetchLotsByNeighbourhoodSucces = lots => {
  return {
    type: actionTypes.FETCH_LOTS_BY_NEIGHBOURHOOD_SUCCESS,
    lots: lots
  }
}

export const fetchLotsByNeighbourhoodFail = error => {
  return {
    type: actionTypes.FETCH_LOTS_BY_NEIGHBOURHOOD_FAIL,
    error: error
  }
}

export const fetchLotsByNeighbourhoodStart = () => {
  return {
    type: actionTypes.FETCH_LOTS_BY_NEIGHBOURHOOD_START
  }
}

export const fetchLotsByNeighbourhood = guid => {
  return async dispatch => {
    dispatch(fetchLotsByNeighbourhoodStart())
    const api = await getApi(guid)
    try {
      const response = await api.get(getFunctionalUnitAPI)
      dispatch(fetchLotsByNeighbourhoodSucces(response.data))
    } catch (error) {
      dispatch(fetchLotsByNeighbourhoodFail(error))
    }
  }
}
