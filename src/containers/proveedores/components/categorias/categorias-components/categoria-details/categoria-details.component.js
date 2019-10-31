import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import compose from 'recompose/compose'
import themeStyles from './categoria-details.theme.style'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Button, Divider } from '@material-ui/core'
import * as actions from 'store/actions/index.actions'
import axios from 'axios'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import Spinner from 'react-spinner-material'

class ProveedorDetalle extends Component {
  state = {
    data: this.props.data,
    onOpenNewServicio: this.props.onOpenNewServicio
  }

  componentDidMount() {
    this.props.onFetchServices(this.props.data.id)
  }

  onOpenNewServicio = data => {
    this.state.onOpenNewServicio(data)
  }

  updateSelectedData = () => {
    this.setState({ data: this.props.data })
  }

  render() {
    const { classes, data } = this.props
    if (this.state.data.id !== this.props.data.id) {
      this.updateSelectedData()
      this.props.onFetchServices(this.props.data.id)
    }

    return (
      <Grid container className={classes.gridContainerMain}>
        <Grid container className={classes.gridContainer}>
          <Grid item className={classes.gridItemAvatar}>
            {!data.avatar_url ? (
              <Avatar className={classes.avatar}>{data.description.charAt(0).toUpperCase()}</Avatar>
            ) : (
              <Avatar className={classes.avatar} src={data.avatar_url} />
            )}
          </Grid>
          <Grid item className={classes.gridItemTitle}>
            <div className={classes.divWrapperSpace}>
              <Typography className={classes.tyHint}>Categoria: </Typography>
              <Typography className={classes.tyTitle}>{data.description}</Typography>
            </div>
          </Grid>
          {this.props.loadingServices ? (
            <div className={classes.divWrapperSpinner}>
              <Spinner />
            </div>
          ) : (
            <div>
              {this.props.servicesList.length === 0 ? (
                <Typography className={classes.tyNoServices}>
                  Esta categoría no tiene Servicios
                </Typography>
              ) : (
                this.props.servicesList.map((service, index) => (
                  <div key={index}>
                    <Divider />
                    <div className={classes.divWrapperContainer}>
                      <div className={classes.divWrapper}>
                        <Typography className={classes.tyHintSmall}>Servicio:</Typography>
                        <Typography>{service.description}</Typography>
                      </div>
                      {service.detail === null ? (
                        ''
                      ) : (
                        <div className={classes.divWrapper}>
                          <Typography className={classes.tyHintSmall}>Detalle:</Typography>
                          <Typography>{service.detail}</Typography>
                        </div>
                      )}
                      <div className={classes.divWrapper}>
                        <Typography className={classes.tyHintSmall}>Precio minimo:</Typography>
                        <Typography>${service.minimum_price}</Typography>
                      </div>
                      <div className={classes.divWrapper}>
                        <Typography className={classes.tyHintSmall}>
                          Adicional por urgencia:
                        </Typography>
                        <Typography>${service.urgency_additional_price}</Typography>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </Grid>
        <Grid item className={classes.gridItemButtons}>
          <Button className={classes.button} onClick={() => this.onOpenNewServicio(data)}>
            Nuevo Servicio
          </Button>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    servicesList: state.proveedores.servicesList,
    loadingServices: state.proveedores.loadingServices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchServices: id => dispatch(actions.fetchServices(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withWidth(),
    withStyles(themeStyles, { withTheme: true })
  )(withErrorHandler(ProveedorDetalle, axios))
)
