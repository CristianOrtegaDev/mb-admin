import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import themeStyles from './admin-proveedores.theme.style'
import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import NovedadesList from './admin-proveedores-components/proveedores-list/proveedores-list.component'
import ActionsHeader from './admin-proveedores-components/proveedores-header/proveedores-header.component'
import NovedadDetails from './admin-proveedores-components/proveedores-details/proveedores-details.component'
import NoNovedades from './admin-proveedores-components/no-proveedores/no-proveedores.component'
import { Grid, Button } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import NuevoProveedor from './admin-proveedores-components/nuevo-proveedor/nuevo-proveedor.component'
import axios from 'axios'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import Spinner from 'react-spinner-material'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { fetchProveedores } from 'store/actions/proveedores.actions'

class AdminProveedores extends Component {
  state = {
    selectedSupplier: null,
    isNewProveedorOpen: false,
    onClose: this.props.onClose
  }

  componentDidMount() {
    this.props.fetchProveedores()
  }

  selectedSupplier = user => () => {
    this.setState({ selectedSupplier: user })
  }
  onOpenNewProveedor = () => {
    this.setState({ isNewProveedorOpen: true })
  }

  onCloseNewProveedor = () => {
    this.setState({ isNewProveedorOpen: false })
  }

  onHandleClose = () => {
    this.state.onClose()
  }

  createMainView = () => {
    const { classes } = this.props

    return (
      <div>
        <Grid item className={classes.gridButtonBack}>
          <Button onClick={this.onHandleClose} className={classes.ButtonBack} variant="fab">
            <ArrowBack className={classes.IconBack} />
          </Button>
        </Grid>
        <div className={classes.novedadesWrapper}>
          <div className={classes.novedadesheader}>
            <div className={classes.userDetailHeader}>
              <ActionsHeader onOpenNewProveedor={this.onOpenNewProveedor} />
            </div>
            {/*   <SearchComponent />*/}
          </div>
          <div className={classes.userWrapper}>
            {this.props.loadingProveedores ? (
              <Spinner />
            ) : (
              <NovedadesList
                selectedSupplier={this.state.selectedSupplier}
                list={this.props.proveedoresList}
                onSelect={this.selectedSupplier}
              />
            )}
            <div className={classNames(classes.userDetails, 'portal-hide-scrollbars')}>
              {this.state.selectedSupplier ? (
                <NovedadDetails
                  data={this.state.selectedSupplier}
                  onOpenNewServicio={this.onOpenNewServicio}
                />
              ) : (
                <NoNovedades />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.novedadesWrapper}>
        {this.state.isNewProveedorOpen ? (
          <NuevoProveedor onClose={this.onCloseNewProveedor} />
        ) : (
          this.createMainView()
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ proveedores }) => {
  return {
    proveedoresList: proveedores.proveedoresList,
    loadingProveedores: proveedores.loadingProveedores
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProveedores
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
  )(withErrorHandler(AdminProveedores, axios))
)
