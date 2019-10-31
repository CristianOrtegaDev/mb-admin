import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './app.component'
import { Provider } from 'react-redux'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker'
import WebFont from 'webfontloader'
import { ThemeProvider } from 'styled-components'
import { cacheReader } from 'utils/session'
import theme from 'config/theme'

WebFont.load({
  google: {
    families: ['Roboto:400']
  }
})

const store = configureStore(cacheReader())

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
