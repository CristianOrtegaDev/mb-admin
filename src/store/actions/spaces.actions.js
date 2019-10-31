import { createActions } from 'redux-actions'
import getApi from 'shared/api'
import { getSpacesAPI, postNewSpaceAPI, delSpaceAPI } from 'apiConstants'

const {
  fetchSpacesStart,
  fetchSpacesSuccess,
  fetchSpacesError,
  submitSpaceStart,
  submitSpaceSuccess,
  submitSpaceError
} = createActions({
  FETCH_SPACES_START: () => {},
  FETCH_SPACES_SUCCESS: data => ({ data }),
  FETCH_SPACES_ERROR: error => ({ error }),
  SUBMIT_SPACE_START: () => {},
  SUBMIT_SPACE_SUCCESS: data => ({ data }),
  SUBMIT_SPACE_ERROR: error => ({ error })
})

const fetchSpaces = id => {
  return async dispatch => {
    dispatch(fetchSpacesStart())
    const api = await getApi()
    try {
      const response = await api.get(`${getSpacesAPI}/${id}`)
      dispatch(fetchSpacesSuccess({ values: response.data }))
    } catch (error) {
      dispatch(fetchSpacesError(error))
    }
  }
}

const submitSpace = (activityId, spaceName, times) => {
  return async (dispatch, getState) => {
    dispatch(submitSpaceStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    try {
      await api.post(`${postNewSpaceAPI}/activity-id/${activityId}/space-name/${spaceName}`, times)
      dispatch(submitSpaceSuccess())
    } catch (error) {
      dispatch(submitSpaceError('Error al crear el espacio'))
    }
  }
}

const editSpace = (space_id, open_times, delete_ids) => {
  return async (dispatch, getState) => {
    dispatch(submitSpaceStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    try {
      const spaceData = {
        space_id,
        delete_ids,
        upsert_active_times: open_times
      }
      await api.put(`${postNewSpaceAPI}/${space_id}`, spaceData)
      dispatch(submitSpaceSuccess())
    } catch (error) {
      if (error.response.status === 409) {
        dispatch(
          submitSpaceError(
            'No es posible editar el espacio ya que posee reservas activas en los turnos modificados'
          )
        )
      } else {
        dispatch(submitSpaceError('Error al editar el espacio'))
      }
    }
  }
}

const deleteSpace = id => {
  return async (dispatch, getState) => {
    dispatch(submitSpaceStart())
    let {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    try {
      await api.delete(`${delSpaceAPI}/${id}`)
      dispatch(submitSpaceSuccess())
    } catch (error) {
      if (error.response.status === 409) {
        dispatch(
          submitSpaceError('No es posible eliminar el espacio ya que posee reservas activas')
        )
      } else {
        dispatch(submitSpaceError('Error al eliminar el espacio'))
      }
    }
  }
}

export {
  fetchSpaces,
  fetchSpacesStart,
  fetchSpacesSuccess,
  fetchSpacesError,
  submitSpace,
  submitSpaceStart,
  submitSpaceSuccess,
  submitSpaceError,
  editSpace,
  deleteSpace
}
