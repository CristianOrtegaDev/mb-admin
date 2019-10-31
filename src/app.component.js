import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import rtl from 'jss-rtl'
import { create } from 'jss'
import { JssProvider } from 'react-jss'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import { authCheckState } from 'store/actions/auth.actions'
import { updateUserInfo, setNeighbourhood } from 'store/actions/userInfo.actions'
import { saveCacheUserInfo } from 'utils/session'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset
} from '@material-ui/core/styles'
import Routes from './routes'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
const generateClassName = createGenerateClassName()

class App extends React.Component {
  componentDidMount() {
    this.props.authCheckState()
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) this.generateInitialUserInformation()
  }

  generateInitialUserInformation = () => {
    let userInfo = this.props.user
    this.props.updateUserInfo(userInfo)
    saveCacheUserInfo(userInfo)
  }

  componentWillReceiveProps(nextProps) {
    if (document.body) {
      document.body.dir = nextProps.themeConfig.contentTheme.direction
    }
  }

  render() {
    const childProps = {}
    const { themeConfig, layoutConfig, isAuthenticated } = this.props

    sessionStorage.setItem(
      'portalData',
      JSON.stringify({
        theme: {
          ...themeConfig
        },
        layout: {
          ...layoutConfig
        }
      })
    )

    const materialTheme = createMuiTheme(themeConfig.contentTheme)
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={materialTheme}>
          <Routes childProps={childProps} layout={layoutConfig} isAuth={isAuthenticated} />
        </MuiThemeProvider>
      </JssProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    themeConfig: state.theme,
    layoutConfig: state.layout,
    isAuthenticated: state.auth.user
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authCheckState,
      updateUserInfo,
      setNeighbourhood
    },
    dispatch
  )

App.propTypes = {
  themeConfig: PropTypes.shape({
    contentTheme: PropTypes.shape({
      direction: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  layoutConfig: PropTypes.shape({}).isRequired
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App)
