import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import themeStyles from './categorias.theme.style'
import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import CategoriasList from './categorias-components/categorias-list/categorias-list.component'
import ActionsHeader from './categorias-components/categorias-header/categorias-header.component'
import CategoriaDetail from './categorias-components/categoria-details/categoria-details.component'
import NoCategoria from './categorias-components/no-categoria/no-categoria.component'
import { Grid, Button } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import NuevaCategoria from './categorias-components/nueva-categoria/nueva-categoria.component'
import NuevoServicio from './categorias-components/nuevo-servicio/nuevo-servicio.component'
import axios from 'axios'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import Spinner from 'react-spinner-material'
import { bindActionCreators } from 'redux'
import { fetchCategorias } from 'store/actions/proveedores.actions'
import classNames from 'classnames'

class Categorias extends Component {
  state = {
    selectedCategoria: null,
    selectedService: null,
    isNewCategoriaOpen: false,
    isNewServicioOpen: false,
    onClose: this.props.onClose
  }

  componentDidMount() {
    this.props.fetchCategorias()
  }

  selectedActividad = user => () => {
    this.setState({ selectedCategoria: user })
  }
  onOpenNewCategoria = () => {
    this.setState({ isNewCategoriaOpen: true })
  }

  onCloseNuevaCategoria = () => {
    this.setState({ isNewCategoriaOpen: false })
  }

  onOpenNewServicio = data => {
    this.setState({ isNewServicioOpen: true, selectedService: data })
  }

  onCloseNuevaServicio = () => {
    this.setState({ isNewServicioOpen: false })
  }

  onHandleClose = () => {
    this.state.onClose()
  }

  createNew = () => {
    return (
      <div>
        {this.state.isNewCategoriaOpen ? (
          <NuevaCategoria onClose={this.onCloseNuevaCategoria} />
        ) : (
          <NuevoServicio
            onClose={this.onCloseNuevaServicio}
            serviceData={this.state.selectedService}
          />
        )}
      </div>
    )
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
              <ActionsHeader onOpenNewCategoria={this.onOpenNewCategoria} />
            </div>
            {/*   <SearchComponent />*/}
          </div>
          <div className={classes.userWrapper}>
            {!this.props.loadingCategorias ? (
              <CategoriasList
                selectedCategoria={this.state.selectedActividad}
                list={this.props.categoriasList}
                onSelect={this.selectedActividad}
              />
            ) : (
              <div className={classes.divWrapperSpinner}>
                <Spinner />
              </div>
            )}

            <div className={classNames(classes.userDetails, 'portal-hide-scrollbars')}>
              {this.state.selectedCategoria ? (
                <CategoriaDetail
                  data={this.state.selectedCategoria}
                  onOpenNewServicio={this.onOpenNewServicio}
                />
              ) : (
                <NoCategoria />
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
        {this.state.isNewCategoriaOpen || this.state.isNewServicioOpen
          ? this.createNew()
          : this.createMainView()}
      </div>
    )
  }
}

const mapStateToProps = ({ proveedores }) => {
  return {
    categoriasList: proveedores.categoriasList,
    loadingCategorias: proveedores.loadingCategorias
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCategorias
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
  )(withErrorHandler(Categorias, axios))
)
