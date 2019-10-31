import * as actionTypes from './actionTypes'
import {
  getEventListAPI,
  getNewsListAPI,
  postNewEventAPI,
  postNewArticleAPI,
  deleteArticleAPI,
  deleteEventAPI
} from 'apiConstants'
import getApi from 'shared/api'

export const fetchEventosSuccess = event => {
  return {
    type: actionTypes.FETCH_EVENTS_SUCCESS,
    event: event
  }
}

export const fetchEventosFail = error => {
  return {
    type: actionTypes.FETCH_EVENTS_FAIL,
    error: error
  }
}

export const fetchEventosStart = () => {
  return {
    type: actionTypes.FETCH_EVENTS_START
  }
}

export const fetchFeedEvent = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchEventosStart())
    const {
      feed,
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    let eventTake = reset ? 10 : feed.eventTake
    const page = feed.page

    try {
      const response = await api.get(`${getEventListAPI}${page}/${eventTake}`)
      let hasMoreUpdated = response.data.length === eventTake
      let takeUpdated = hasMoreUpdated ? eventTake + 10 : eventTake
      dispatch(
        fetchEventosSuccess({
          values: response.data,
          eventTake: takeUpdated,
          hasMoreEvents: hasMoreUpdated
        })
      )
    } catch (error) {
      dispatch(fetchEventosFail(error))
    }
  }
}

export const fetchNoticiasSuccess = articles => {
  return {
    type: actionTypes.FETCH_ARTICLES_SUCCESS,
    articles: articles
  }
}

export const fetchNoticiasFail = error => {
  return {
    type: actionTypes.FETCH_ARTICLES_FAIL,
    error: error
  }
}

export const fetchNoticiasStart = () => {
  return {
    type: actionTypes.FETCH_ARTICLES_START
  }
}

export const fetchFeedNews = reset => {
  return async (dispatch, getState) => {
    dispatch(fetchNoticiasStart())
    const {
      feed,
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid)
    let articlesTake = reset ? 10 : feed.articlesTake
    const page = feed.page
    try {
      const response = await api.get(`${getNewsListAPI}${page}/${articlesTake}`)
      let hasMoreUpdated = response.data.length === articlesTake
      let takeUpdated = hasMoreUpdated ? articlesTake + 10 : articlesTake
      dispatch(
        fetchNoticiasSuccess({
          values: response.data,
          articlesTake: takeUpdated,
          hasMoreArticles: hasMoreUpdated
        })
      )
    } catch (error) {
      dispatch(fetchNoticiasFail(error))
    }
  }
}

export const createNewEventSuccess = newEvent => {
  return {
    type: actionTypes.CREATE_NEW_EVENT_SUCCESS,
    newEventId: newEvent.id,
    newEventData: newEvent
  }
}

export const createNewEventFail = error => {
  return {
    type: actionTypes.CREATE_NEW_EVENT_FAIL,
    error: error
  }
}

export const createNewEventStart = () => {
  return {
    type: actionTypes.CREATE_NEW_EVENT_START
  }
}

export const createNewEvent = newEvent => {
  return async (dispatch, getState) => {
    dispatch(createNewEventStart())
    const {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    return api
      .post(postNewEventAPI, newEvent)
      .then(res => {
        dispatch(createNewEventSuccess(res.data))
      })
      .catch(err => {
        dispatch(createNewEventFail(err))
      })
  }
}

export const createNewArticleSuccess = newArticle => {
  return {
    type: actionTypes.CREATE_NEW_ARTICLE_SUCCESS,
    newArticleId: newArticle.id,
    newArticleData: newArticle
  }
}

export const createNewArticleFail = error => {
  return {
    type: actionTypes.CREATE_NEW_ARTICLE_FAIL,
    error: error
  }
}

export const createNewArticleStart = () => {
  return {
    type: actionTypes.CREATE_NEW_ARTICLE_START
  }
}

export const createNewArticle = newNoticia => {
  return async (dispatch, getState) => {
    dispatch(createNewArticleStart())
    const {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    return api
      .post(postNewArticleAPI, newNoticia)
      .then(res => {
        dispatch(createNewArticleSuccess(res.data))
      })
      .catch(err => {
        dispatch(createNewArticleFail(err))
      })
  }
}

export const deleteArticleSuccess = () => {
  return {
    type: actionTypes.DELETE_ARTICLE_SUCCESS
  }
}

export const deleteArticleFail = error => {
  return {
    type: actionTypes.DELETE_ARTICLE_FAIL,
    error: error
  }
}

export const deleteArticleStart = () => {
  return {
    type: actionTypes.DELETE_ARTICLE_START
  }
}

export const deleteArticleById = id => {
  return async (dispatch, getState) => {
    dispatch(deleteArticleStart())
    const {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    return api
      .delete(deleteArticleAPI + `${id}`)
      .then(res => {
        dispatch(deleteArticleSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteArticleFail(err))
      })
  }
}

export const deleteEventSuccess = () => {
  return {
    type: actionTypes.DELETE_EVENT_SUCCESS
  }
}

export const deleteEventFail = error => {
  return {
    type: actionTypes.DELETE_EVENT_FAIL,
    error: error
  }
}

export const deleteEventStart = () => {
  return {
    type: actionTypes.DELETE_EVENT_START
  }
}

export const deleteEventById = id => {
  return async (dispatch, getState) => {
    dispatch(deleteEventStart())
    const {
      userInfo: {
        selectedNeighbourhood: { guid }
      }
    } = getState()
    const api = await getApi(guid, true)
    return api
      .delete(deleteEventAPI + `${id}`)
      .then(res => {
        dispatch(deleteEventSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteEventFail(err))
      })
  }
}
