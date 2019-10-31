import * as actionTypes from './actionTypes'
import { postNewProprietaryAPI, getSearchedPadronAPI, getPadronAPI } from 'apiConstants'
import getApi from 'shared/api'

export const fetchPadronSuccess = padron => {
  return {
    type: actionTypes.FETCH_PADRON_SUCCESS,
    padron: padron
  }
}

export const fetchPadronFail = error => {
  return {
    type: actionTypes.FETCH_PADRON_FAIL,
    error: error
  }
}

export const fetchPadronStart = () => {
  return {
    type: actionTypes.FETCH_PADRON_START
  }
}

export const createProprietarySuccess = (id, newProprietaryData) => {
  return {
    type: actionTypes.CREATE_PROPRIETARY_SUCCESS,
    newPadronId: id,
    newProprietaryData: newProprietaryData
  }
}

export const createProprietaryFail = error => {
  return {
    type: actionTypes.CREATE_PROPRIETARY_FAIL,
    error: error
  }
}

export const createProprietaryStart = () => {
  return {
    type: actionTypes.CREATE_PROPRIETARY_START
  }
}

export const newProprietary = (newProprietary, guid) => {
  return async dispatch => {
    const api = await getApi(guid, true)
    dispatch(createProprietaryStart())
    return api
      .post(postNewProprietaryAPI, newProprietary)
      .then(() => {
        dispatch(createProprietarySuccess())
      })
      .catch(err => {
        dispatch(createProprietaryFail(err))
      })
  }
}

export const searchPadron = textoABuscar => {
  return async dispatch => {
    const api = await getApi(null, true)
    dispatch(fetchPadronStart())
    api
      .get(getSearchedPadronAPI + textoABuscar)
      .then(res => {
        dispatch(fetchPadronSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchPadronFail(err))
      })
  }
}

export const fetchPadron = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchPadronStart())
    let {
      padron,
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)

    let take = reset ? 10 : padron.take

    try {
      // Fetching content
      const response = await api.get(getPadronAPI)

      // Analizing response
      let hasMoreUpdated = response.data.length === take
      let takeUpdated = hasMoreUpdated ? take + 10 : take

      dispatch(
        fetchPadronSuccess({
          values: response.data,
          take: takeUpdated,
          hasMore: hasMoreUpdated
        })
      )
    } catch (error) {
      dispatch(fetchPadronFail(error))
    }
  }
}
