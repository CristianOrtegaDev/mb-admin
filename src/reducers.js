import { combineReducers } from 'redux'

import themeReducer from './store/reducers/theme.reducer'
import layoutReducer from './store/reducers/layout.reducer'
import authReducer from './store/reducers/auth.reducer'
import securityStaffReducer from './store/reducers/securityStaff.reducer'
import padronReducer from './store/reducers/padron.reducer'
import familiaresReducer from './store/reducers/familiares.reducer'
import invitadosReducer from './store/reducers/invitados.reducer'
import lotesReducer from './store/reducers/lotes.reducer'
import feedReducer from './store/reducers/feed.reducer'
import mensajesReducer from './store/reducers/mensajes.reducer'
import proveedoresReducer from './store/reducers/proveedores.reducer'
import reservasReducer from './store/reducers/reservas.reducer'
import neighbourhoodReducer from './store/reducers/neighbourhood.reducer'
import selectedMessage from './store/reducers/selectedMessage'
import selectedGuest from './store/reducers/selectedGuest'
import userInfo from './store/reducers/userInfo.reducer'
import selectedResource from './store/reducers/selectedResource'
import activities from './store/reducers/activities.reducer'
import spaces from './store/reducers/spaces.reducers'
import activeTimes from './store/reducers/activeTImes.reducer'

// Combine with other reducers we may add in the future
const todoApp = combineReducers({
  theme: themeReducer,
  layout: layoutReducer,
  auth: authReducer,
  securityStaff: securityStaffReducer,
  padron: padronReducer,
  invitados: invitadosReducer,
  familiares: familiaresReducer,
  lotes: lotesReducer,
  feed: feedReducer,
  messages: mensajesReducer,
  proveedores: proveedoresReducer,
  reservas: reservasReducer,
  neighbourhood: neighbourhoodReducer,
  selectedMessage,
  selectedGuest,
  userInfo,
  selectedResource,
  activities,
  activeTimes,
  spaces
})

export default todoApp
