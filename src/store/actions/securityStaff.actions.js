import * as actionTypes from './actionTypes'
import {
  postNewSecurityStaffAPI,
  getSearchedSecurityStaffListAPI,
  getSecurityStaffListAPI
} from 'apiConstants'
import getApi from 'shared/api'

export const fetchSecurityStaffSuccess = staff => {
  return {
    type: actionTypes.FETCH_SECURITYSTAFF_SUCCESS,
    staff: staff
  }
}

export const fetchSecurityStaffFail = error => {
  return {
    type: actionTypes.FETCH_SECURITYSTAFF_FAIL,
    error: error
  }
}

export const fetchSecurityStaffStart = () => {
  return {
    type: actionTypes.FETCH_SECURITYSTAFF_START
  }
}

//-------------------------------------------------------------

export const createSecurityStaffSuccess = newStaff => {
  return {
    type: actionTypes.CREATE_SECURITYSTAFF_SUCCESS,
    newStaffId: newStaff.id,
    newStaffData: newStaff
  }
}

export const createSecurityStaffFail = error => {
  return {
    type: actionTypes.CREATE_SECURITYSTAFF_FAIL,
    error: error
  }
}

export const createSecurityStaffStart = () => {
  return {
    type: actionTypes.CREATE_SECURITYSTAFF_START
  }
}

//-------------------------------------------------------------

export const filterSearchChanged = filter => {
  return {
    type: actionTypes.FILTER_SEARCH_CHANGED,
    filter: filter
  }
}

export const createSecurityStaff = newStaff => {
  return async (dispatch, getState) => {
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    dispatch(createSecurityStaffStart())
    return await api
      .post(postNewSecurityStaffAPI, newStaff)
      .then(res => {
        dispatch(createSecurityStaffSuccess(res.data))
      })
      .catch(err => {
        dispatch(createSecurityStaffFail(err))
      })
  }
}

export const searchSecurityStaff = (filter, textoABuscar) => {
  return async dispatch => {
    const api = await getApi()
    dispatch(fetchSecurityStaffStart())
    const texto = filter + (filter.length > 0 ? ':' : '') + textoABuscar
    api
      .get(getSearchedSecurityStaffListAPI + texto)
      .then(res => {
        dispatch(fetchSecurityStaffSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchSecurityStaffFail(err))
      })
  }
}

export const fetchSecurityStaff = () => {
  return async dispatch => {
    const api = await getApi()
    dispatch(fetchSecurityStaffStart())
    api
      .get(getSecurityStaffListAPI)
      .then(res => {
        dispatch(fetchSecurityStaffSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchSecurityStaffFail(err))
      })
  }
}
