import * as actionTypes from './actionTypes'
import {
  getCategoriesAPI,
  getSuppliersAPI,
  getServicesAPI,
  getNeighbourhoodAPI,
  postNewSupplier,
  postNewCategory,
  postNewService,
  getSuppliersRequestAPI
} from 'apiConstants'
import getApi from 'shared/api'

export const fetchCategoriasSuccess = categorias => {
  return {
    type: actionTypes.FETCH_CATEGORIAS_SUCCESS,
    categorias: categorias
  }
}

export const fetchCategoriasFail = error => {
  return {
    type: actionTypes.FETCH_CATEGORIAS_FAIL,
    error: error
  }
}

export const fetchCategoriasStart = () => {
  return {
    type: actionTypes.FETCH_CATEGORIAS_START
  }
}

export const fetchCategorias = guid => {
  return async dispatch => {
    const api = await getApi(guid, false)
    dispatch(fetchCategoriasStart())
    api
      .get(`${getCategoriesAPI}`)
      .then(res => {
        dispatch(fetchCategoriasSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchCategoriasFail(err))
      })
  }
}
//----------------------------------------------------------------

export const fetchProveedoresSuccess = proveedores => {
  return {
    type: actionTypes.FETCH_PROVEEDORES_SUCCESS,
    proveedores: proveedores
  }
}

export const fetchProveedoresFail = error => {
  return {
    type: actionTypes.FETCH_PROVEEDORES_FAIL,
    error: error
  }
}

export const fetchProveedoresStart = () => {
  return {
    type: actionTypes.FETCH_PROVEEDORES_START
  }
}

export const fetchProveedores = () => {
  return async dispatch => {
    const api = await getApi()
    dispatch(fetchProveedoresStart())
    api
      .get(getSuppliersAPI)
      .then(res => {
        dispatch(fetchProveedoresSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchProveedoresFail(err))
      })
  }
}

//-------------------------------------------------------------------------
export const fetchServicesSuccess = services => {
  return {
    type: actionTypes.FETCH_SERVICES_SUCCESS,
    services: services
  }
}

export const fetchServicesFail = error => {
  return {
    type: actionTypes.FETCH_SERVICES_FAIL,
    error: error
  }
}

export const fetchServicesStart = () => {
  return {
    type: actionTypes.FETCH_SERVICES_START
  }
}

export const fetchServices = id => {
  return async dispatch => {
    const api = await getApi()
    dispatch(fetchServicesStart())
    api
      .get(`${getServicesAPI}/${id}`)
      .then(res => {
        dispatch(fetchServicesSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchServicesFail(err))
      })
  }
}

//-------------------------------------------------------------------------
export const fetchNeighbourhoodsSuccess = neighbourhood => {
  return {
    type: actionTypes.FETCH_NEIGHBOURHOOD_SUCCESS,
    neighbourhood: neighbourhood
  }
}

export const fetchNeighbourhoodsFail = error => {
  return {
    type: actionTypes.FETCH_NEIGHBOURHOOD_FAIL,
    error: error
  }
}

export const fetchNeighbourhoodsStart = () => {
  return {
    type: actionTypes.FETCH_NEIGHBOURHOOD_START
  }
}

export const fetchNeighbourhoods = () => {
  return async dispatch => {
    dispatch(fetchNeighbourhoodsStart())
    const api = await getApi()
    api
      .get(`${getNeighbourhoodAPI}/0/1000`)
      .then(res => {
        dispatch(fetchNeighbourhoodsSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchNeighbourhoodsFail(err))
      })
  }
}

//----------------------------------------------------------------

export const createSupplierSuccess = newSupplier => {
  return {
    type: actionTypes.CREATE_SUPPLIERS_SUCCESS,
    newSupplier: newSupplier
  }
}

export const createSupplierFail = error => {
  return {
    type: actionTypes.CREATE_SUPPLIERS_FAIL,
    error: error
  }
}

export const createSupplierStart = () => {
  return {
    type: actionTypes.CREATE_SUPPLIERS_START
  }
}

export const createSupplier = newSupplier => {
  return async dispatch => {
    const api = await getApi(false, true)
    dispatch(createSupplierStart())
    return api
      .post(postNewSupplier, newSupplier)
      .then(() => {
        dispatch(createSupplierSuccess(newSupplier))
      })
      .catch(err => {
        dispatch(createSupplierFail(err.message))
      })
  }
}

//----------------------------------------------------------------

export const createCategorySuccess = newCategoryData => {
  return {
    type: actionTypes.CREATE_CATEGORY_SUCCESS,
    newCategoryData: newCategoryData
  }
}

export const createCategoryFail = error => {
  return {
    type: actionTypes.CREATE_CATEGORY_FAIL,
    error: error
  }
}

export const createCategoryStart = () => {
  return {
    type: actionTypes.CREATE_CATEGORY_START
  }
}

export const createNewCategory = newCategoryData => {
  return async (dispatch, getState) => {
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    dispatch(createCategoryStart())
    return api
      .post(postNewCategory, newCategoryData)
      .then(() => {
        dispatch(createCategorySuccess(newCategoryData))
      })
      .catch(err => {
        dispatch(createCategoryFail(err.message))
      })
  }
}

//----------------------------------------------------------------

export const createServiceSuccess = newService => {
  return {
    type: actionTypes.CREATE_SERVICE_SUCCESS,
    newService: newService
  }
}

export const createServiceFail = error => {
  return {
    type: actionTypes.CREATE_SERVICE_FAIL,
    error: error
  }
}

export const createServiceStart = () => {
  return {
    type: actionTypes.CREATE_SERVICE_START
  }
}

export const createService = newServiceData => {
  return async dispatch => {
    const api = await getApi()
    dispatch(createServiceStart())
    return api
      .post(postNewService + `/${newServiceData.category_id}`, newServiceData)
      .then(res => {
        dispatch(createServiceSuccess(res))
      })
      .catch(err => {
        dispatch(createServiceFail(err.message))
      })
  }
}

//-------------------------------------------------------------------------
export const fetchSuppliersRequestSuccess = requestList => {
  return {
    type: actionTypes.FETCH_SUPPLIERS_REQUESTS_SUCCESS,
    requestList: requestList
  }
}

export const fetchSuppliersRequestFail = error => {
  return {
    type: actionTypes.FETCH_SUPPLIERS_REQUESTS_FAIL,
    error: error
  }
}

export const fetchSuppliersRequestStart = () => {
  return {
    type: actionTypes.FETCH_SUPPLIERS_REQUESTS_START
  }
}

export const fetchSuppliersRequest = () => {
  return async dispatch => {
    dispatch(fetchSuppliersRequestStart())
    const api = await getApi()
    api
      .get(`${getSuppliersRequestAPI}/0/1000`)
      .then(res => {
        dispatch(fetchSuppliersRequestSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchSuppliersRequestFail(err))
      })
  }
}
