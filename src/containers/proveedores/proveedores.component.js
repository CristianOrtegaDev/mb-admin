import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import themeStyles from './proveedores.theme.style'
import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import NovedadesList from './components/proveedores-list/proveedores-list.component'
import ActionsHeader from './components/proveedores-header/proveedores-header.component'
import NovedadDetails from './components/proveedores-details/proveedores-details.component'
import NoNovedades from './components/no-proveedores/no-proveedores.component'
import AdminCategorias from './components/categorias/categorias.component'
import AdminProveedores from './components/admin-proveedores/admin-proveedores.component'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { fetchSuppliersRequest } from 'store/actions/proveedores.actions'
import Spinner from 'react-spinner-material'
import classNames from 'classnames'

class Proveedores extends Component {
  state = {
    selectedNovedad: null,
    isAdminCategoriasOpen: false,
    isAdminProveedoresOpen: false
  }

  componentDidMount() {
    this.props.fetchSuppliersRequest()
  }

  selectedActividad = user => () => {
    this.setState({ selectedNovedad: user })
  }
  onOpenAdminCategorias = () => {
    this.setState({ isAdminCategoriasOpen: true })
  }
  onCloseAdminCategorias = () => {
    this.setState({ isAdminCategoriasOpen: false })
  }

  onOpenAdminProveedores = () => {
    this.setState({ isAdminProveedoresOpen: true })
  }

  onCloseAdminProveedores = () => {
    this.setState({ isAdminProveedoresOpen: false })
  }

  createAdmin = () => {
    return (
      <div>
        {this.state.isAdminCategoriasOpen ? (
          <AdminCategorias onClose={this.onCloseAdminCategorias} />
        ) : (
          <AdminProveedores onClose={this.onCloseAdminProveedores} />
        )}
      </div>
    )
  }

  createMainView = () => {
    const { classes } = this.props

    return (
      <div className={classes.novedadesWrapper}>
        <div className={classes.novedadesheader}>
          <div className={classes.userDetailHeader}>
            <ActionsHeader
              onOpenAdminCategorias={this.onOpenAdminCategorias}
              onOpenAdminProveedores={this.onOpenAdminProveedores}
            />
          </div>
        </div>
        <div className={classes.userWrapper}>
          {!this.props.loadingRequests ? (
            <NovedadesList
              selectedNovedad={this.state.selectedActividad}
              list={this.props.requestList}
              onSelect={this.selectedActividad}
            />
          ) : (
            <Spinner />
          )}

          <div className={classNames(classes.userDetails, 'portal-hide-scrollbars')}>
            {this.state.selectedNovedad ? (
              <NovedadDetails data={this.state.selectedNovedad} />
            ) : (
              <NoNovedades />
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.novedadesWrapper}>
        {this.state.isAdminCategoriasOpen || this.state.isAdminProveedoresOpen
          ? this.createAdmin()
          : this.createMainView()}
      </div>
    )
  }
}

const mapStateToProps = ({ proveedores }) => {
  return {
    requestList: proveedores.requestList,
    loadingRequests: proveedores.loadingRequests
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSuppliersRequest
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withWidth(),
    withStyles(themeStyles, { withTheme: true })
  )(withErrorHandler(Proveedores, axios))
)
