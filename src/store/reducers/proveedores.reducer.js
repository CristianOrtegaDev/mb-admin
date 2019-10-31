import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  categoriasList: [],
  loadingCategorias: false,
  proveedoresList: [],
  loadingProveedores: false,
  servicesList: [],
  loadingServices: false,
  neighbourhoodList: [],
  loadingNeighbourhood: false,
  errorFetchNeighbourhoods: false,
  loadingNewSupplier: false,
  createdNewSupplier: false,
  errorNewSupplier: false,
  loadingNewCategory: false,
  createdNewCategory: false,
  errorNewCategory: false,
  loadingNewService: false,
  createdNewService: false,
  errorNewService: false,
  requestList: [],
  loadingRequests: false
}

const fetchCategoriasSuccess = (state, action) => {
  return updateObject(state, {
    categoriasList: action.categorias,
    loadingCategorias: false
  })
}

const fetchCategoriasFail = state => {
  return updateObject(state, { loadingCategorias: false })
}

const fetchCategoriasStart = state => {
  return updateObject(state, { loadingCategorias: true })
}

const fetchProveedoresSuccess = (state, action) => {
  return updateObject(state, {
    proveedoresList: action.proveedores,
    loadingProveedores: false
  })
}

const fetchProveedoresFail = state => {
  return updateObject(state, { loadingProveedores: false })
}

const fetchProveedoresStart = state => {
  return updateObject(state, { loadingProveedores: true })
}

//-------------------------------------------------------------

const fetchServicesSuccess = (state, action) => {
  return updateObject(state, {
    servicesList: action.services,
    loadingServices: false
  })
}

const fetchServicesFail = state => {
  return updateObject(state, { loadingServices: false })
}

const fetchServicesStart = state => {
  return updateObject(state, { loadingServices: true })
}

//-------------------------------------------------------------

const fetchNeighbourhoodsSuccess = (state, action) => {
  return updateObject(state, {
    neighbourhoodList: action.neighbourhood,
    loadingNeighbourhood: false
  })
}

const fetchNeighbourhoodsFail = state => {
  return updateObject(state, { loadingNeighbourhood: false, errorFetchNeighbourhoods: true })
}

const fetchNeighbourhoodsStart = state => {
  return updateObject(state, { loadingNeighbourhood: true })
}

//-------------------------------------------------------------

const createSupplierStart = state => {
  return updateObject(state, { loadingNewSupplier: true, errorNewSupplier: false })
}

const createSupplierSuccess = state => {
  return updateObject(state, {
    loadingNewSupplier: false,
    createdNewSupplier: true,
    errorNewSupplier: false
  })
}

const createSupplierFail = state => {
  return updateObject(state, {
    createdNewSupplier: false,
    errorNewSupplier: true,
    loadingNewSupplier: false
  })
}

//-------------------------------------------------------------

const createCategoryStart = state => {
  return updateObject(state, { loadingNewCategory: true, errorNewCategory: false })
}

const createCategorySuccess = state => {
  return updateObject(state, {
    loadingNewCategory: false,
    createdNewCategory: true,
    errorNewCategory: false
  })
}

const createCategoryFail = state => {
  return updateObject(state, {
    createdNewCategory: false,
    errorNewCategory: true,
    loadingNewCategory: false
  })
}

//-------------------------------------------------------------

const createServiceStart = state => {
  return updateObject(state, { loadingNewService: true, errorNewService: false })
}

const createServiceSuccess = state => {
  return updateObject(state, {
    loadingNewService: false,
    createdNewService: true,
    errorNewService: false
  })
}

const createServiceFail = state => {
  return updateObject(state, {
    createdNewService: false,
    errorNewService: true,
    loadingNewService: false
  })
}

//-------------------------------------------------------------

const fetchSuppliersRequestSuccess = (state, action) => {
  return updateObject(state, {
    requestList: action.requestList,
    loadingRequests: false
  })
}

const fetchSuppliersRequestFail = state => {
  return updateObject(state, { loadingRequests: false })
}

const fetchSuppliersRequestStart = state => {
  return updateObject(state, { loadingRequests: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIAS_SUCCESS:
      return fetchCategoriasSuccess(state, action)
    case actionTypes.FETCH_CATEGORIAS_FAIL:
      return fetchCategoriasFail(state, action)
    case actionTypes.FETCH_CATEGORIAS_START:
      return fetchCategoriasStart(state, action)

    case actionTypes.FETCH_PROVEEDORES_SUCCESS:
      return fetchProveedoresSuccess(state, action)
    case actionTypes.FETCH_PROVEEDORES_FAIL:
      return fetchProveedoresFail(state, action)
    case actionTypes.FETCH_PROVEEDORES_START:
      return fetchProveedoresStart(state, action)

    case actionTypes.FETCH_SERVICES_SUCCESS:
      return fetchServicesSuccess(state, action)
    case actionTypes.FETCH_SERVICES_FAIL:
      return fetchServicesFail(state, action)
    case actionTypes.FETCH_SERVICES_START:
      return fetchServicesStart(state, action)

    case actionTypes.FETCH_NEIGHBOURHOOD_SUCCESS:
      return fetchNeighbourhoodsSuccess(state, action)
    case actionTypes.FETCH_NEIGHBOURHOOD_FAIL:
      return fetchNeighbourhoodsFail(state, action)
    case actionTypes.FETCH_NEIGHBOURHOOD_START:
      return fetchNeighbourhoodsStart(state, action)

    case actionTypes.CREATE_SUPPLIERS_SUCCESS:
      return createSupplierSuccess(state, action)
    case actionTypes.CREATE_SUPPLIERS_FAIL:
      return createSupplierFail(state, action)
    case actionTypes.CREATE_SUPPLIERS_START:
      return createSupplierStart(state, action)

    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return createCategorySuccess(state, action)
    case actionTypes.CREATE_CATEGORY_FAIL:
      return createCategoryFail(state, action)
    case actionTypes.CREATE_CATEGORY_START:
      return createCategoryStart(state, action)

    case actionTypes.CREATE_SERVICE_SUCCESS:
      return createServiceSuccess(state, action)
    case actionTypes.CREATE_SERVICE_FAIL:
      return createServiceFail(state, action)
    case actionTypes.CREATE_SERVICE_START:
      return createServiceStart(state, action)

    case actionTypes.FETCH_SUPPLIERS_REQUESTS_SUCCESS:
      return fetchSuppliersRequestSuccess(state, action)
    case actionTypes.FETCH_SUPPLIERS_REQUESTS_FAIL:
      return fetchSuppliersRequestFail(state, action)
    case actionTypes.FETCH_SUPPLIERS_REQUESTS_START:
      return fetchSuppliersRequestStart(state, action)

    default:
      return state
  }
}

export default reducer
