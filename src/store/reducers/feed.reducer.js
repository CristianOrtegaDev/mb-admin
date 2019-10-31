import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  eventList: [],
  articleList: [],
  loadingEvents: false,
  loadingArticles: false,
  loadingNewArticle: false,
  createdNewArticle: false,
  errorNewArticle: false,
  loadingNewEvent: false,
  createdNewEvent: false,
  errorNewEvent: false,

  page: 0,
  hasMoreEvents: true,
  eventTake: 10,
  hasMoreArticles: true,
  articlesTake: 10,

  loadingDeleteArticle: false,
  deletedArticle: false,
  errorDeleteArticle: false,

  loadingDeleteEvent: false,
  deletedEvent: false,
  errorDeleteEvent: false
}

const fetchEventosSuccess = (state, action) => {
  return updateObject(state, {
    eventList: action.event.values,
    loadingEvents: false,
    hasMoreEvents: action.event.hasMoreEvents,
    eventTake: action.event.eventTake
  })
}

const fetchEventosFail = state => {
  return updateObject(state, { loadingEvents: false })
}

const fetchEventosStart = state => {
  return updateObject(state, { loadingEvents: true })
}

//--------------------------------------------------------------------------------------

const fetchNoticiasSuccess = (state, action) => {
  return updateObject(state, {
    articleList: action.articles.values,
    loadingArticles: false,
    hasMoreArticles: action.articles.hasMoreArticles,
    articlesTake: action.articles.articlesTake
  })
}

const fetchNoticiasFail = state => {
  return updateObject(state, { loadingArticles: false })
}

const fetchNoticiasStart = state => {
  return updateObject(state, { loadingArticles: true })
}

//--------------------------------------------------------------------------------------

const createEventStart = state => {
  return updateObject(state, { loadingNewEvent: true })
}

const createEventSuccess = (state, action) => {
  const newEvent = updateObject(action.newEventData, { id: action.newEventId })
  return updateObject(state, {
    loadingNewEvent: false,
    createdNewEvent: true,
    eventList: state.eventList.concat(newEvent)
  })
}

const createEventFail = state => {
  return updateObject(state, {
    loadingNewEvent: false,
    createdNewEvent: false,
    errorNewEvent: true
  })
}

//----------------------------------------------------------------------------------------

const createNewArticleStart = state => {
  return updateObject(state, { loadingNewArticle: true })
}

const createNewArticleSuccess = (state, action) => {
  const newArticle = updateObject(action.newArticleData, { id: action.newArticleId })
  return updateObject(state, {
    loadingNewArticle: false,
    createdNewArticle: true,
    articleList: state.articleList.concat(newArticle)
  })
}

const createNewArticleFail = state => {
  return updateObject(state, {
    loadingNewArticle: false,
    createdNewArticle: false,
    errorNewArticle: true
  })
}

//----------------------------------------------------------------------------------------

const deleteArticleStart = state => {
  return updateObject(state, { loadingDeleteArticle: true, errorDeleteArticle: false })
}

const deleteArticleSuccess = state => {
  return updateObject(state, {
    loadingDeleteArticle: false,
    deletedArticle: true
  })
}

const deleteArticleFail = state => {
  return updateObject(state, {
    loadingDeleteArticle: false,
    deletedArticle: false,
    errorDeleteArticle: true
  })
}

//----------------------------------------------------------------------------------------

const deleteEventStart = state => {
  return updateObject(state, { loadingDeleteEvent: true, errorDeleteEvent: false })
}

const deleteEventSuccess = state => {
  return updateObject(state, {
    loadingDeleteEvent: false,
    deletedEvent: true
  })
}

const deleteEventFail = state => {
  return updateObject(state, {
    loadingDeleteEvent: false,
    deletedEvent: false,
    errorDeleteEvent: true
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENTS_SUCCESS:
      return fetchEventosSuccess(state, action)
    case actionTypes.FETCH_EVENTS_FAIL:
      return fetchEventosFail(state, action)
    case actionTypes.FETCH_EVENTS_START:
      return fetchEventosStart(state, action)

    case actionTypes.FETCH_ARTICLES_SUCCESS:
      return fetchNoticiasSuccess(state, action)
    case actionTypes.FETCH_ARTICLES_FAIL:
      return fetchNoticiasFail(state, action)
    case actionTypes.FETCH_ARTICLES_START:
      return fetchNoticiasStart(state, action)

    case actionTypes.CREATE_NEW_EVENT_SUCCESS:
      return createEventSuccess(state, action)
    case actionTypes.CREATE_NEW_EVENT_FAIL:
      return createEventFail(state, action)
    case actionTypes.CREATE_NEW_EVENT_START:
      return createEventStart(state, action)

    case actionTypes.CREATE_NEW_ARTICLE_SUCCESS:
      return createNewArticleSuccess(state, action)
    case actionTypes.CREATE_NEW_ARTICLE_FAIL:
      return createNewArticleFail(state, action)
    case actionTypes.CREATE_NEW_ARTICLE_START:
      return createNewArticleStart(state, action)

    case actionTypes.DELETE_ARTICLE_SUCCESS:
      return deleteArticleSuccess(state, action)
    case actionTypes.DELETE_ARTICLE_FAIL:
      return deleteArticleFail(state, action)
    case actionTypes.DELETE_ARTICLE_START:
      return deleteArticleStart(state, action)

    case actionTypes.DELETE_EVENT_SUCCESS:
      return deleteEventSuccess(state, action)
    case actionTypes.DELETE_EVENT_FAIL:
      return deleteEventFail(state, action)
    case actionTypes.DELETE_EVENT_START:
      return deleteEventStart(state, action)
    default:
      return state
  }
}

export default reducer
