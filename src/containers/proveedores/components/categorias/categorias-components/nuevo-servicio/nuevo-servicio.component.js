import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import {
  withWidth,
  withStyles,
  Grid,
  Button,
  Paper,
  TextField,
  createMuiTheme,
  MuiThemeProvider,
  Typography
} from '@material-ui/core'
import themeStyles from './nuevo-servicio.theme.style'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { createService } from 'store/actions/proveedores.actions'
import axios from 'axios'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { updateObject, checkValidity } from 'shared/utility'
import { bindActionCreators } from 'redux'
import LoaderDialog from 'components/loaders/loaderDialog'

class NuevoServicio extends Component {
  state = {
    isIncomplete: false,
    controls: {
      name: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Nombre del Servicio'
        },
        validation: {
          required: true
        }
      },

      detail: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Descripción'
        },
        validation: {
          required: true
        }
      },
      minimum: {
        value: '',
        config: {
          type: 'number',
          placeholder: 'Precio mínimo:'
        },
        validation: {
          required: true
        }
      },
      additional: {
        value: '',
        config: {
          type: 'number',
          placeholder: 'Extra por urgencia:'
        },
        validation: {
          required: true
        }
      }
    },
    onHandleClose: this.props.onClose,
    selectedService: this.props.serviceData
  }

  onHandleClose = () => {
    if (this.state.onHandleClose) {
      this.state.onHandleClose()
    }
  }

  checkServiceData = data =>
    Object.keys(data).every(e => (typeof data[e] === 'number' || data[e].length ? true : false))

  submitHandler = async event => {
    event.preventDefault()
    const newServiceData = {
      category_id: this.state.selectedService.id,
      description: this.state.controls.name.value,
      detail: this.state.controls.detail.value,
      minimum_price: this.state.controls.minimum.value,
      urgency_additional_price: this.state.controls.additional.value
    }
    if (this.checkServiceData(newServiceData)) {
      this.setState({ isIncomplete: false })
      await this.props.createService(newServiceData)
      if (this.props.createdNewService) this.onHandleClose()
    } else {
      this.setState({ isIncomplete: true })
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    })
    this.setState({ controls: updatedControls })
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { 500: '#1873f3' } //theme.palette.common.blue
      },
      typography: { useNextVariants: true }
    })
    const { classes } = this.props

    return (
      <div>
        <Grid item className={classes.gridButtonBack}>
          <Button onClick={this.onHandleClose} className={classes.ButtonBack} variant="fab">
            <ArrowBack className={classes.IconBack} />
          </Button>
        </Grid>
        <Typography className={classes.tyTitle}>Nuevo Servicio</Typography>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} className={classes.gridItemForm}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.textField}
                  label="Nombre del Servicio:"
                  value={this.state.controls.name.value}
                  required={this.state.controls.name.validation.required}
                  onChange={e => this.inputChangedHandler(e, 'name')}
                  placeholder={this.state.controls.name.config.placeholder}
                  type={this.state.controls.name.config.type}
                />
                <TextField
                  className={classes.textField}
                  label="Descripción:"
                  value={this.state.controls.detail.value}
                  required={this.state.controls.detail.validation.required}
                  onChange={e => this.inputChangedHandler(e, 'detail')}
                  placeholder={this.state.controls.detail.config.placeholder}
                  type={this.state.controls.detail.config.type}
                />
                <Grid item className={classes.gridItemPrices}>
                  <TextField
                    label="Precio mínimo:"
                    value={this.state.controls.minimum.value}
                    required={this.state.controls.minimum.validation.required}
                    onChange={e => this.inputChangedHandler(e, 'minimum')}
                    placeholder={this.state.controls.minimum.config.placeholder}
                    type={this.state.controls.minimum.config.type}
                  />
                  <TextField
                    label="Extra por urgencia:"
                    value={this.state.controls.additional.value}
                    required={this.state.controls.additional.validation.required}
                    onChange={e => this.inputChangedHandler(e, 'additional')}
                    placeholder={this.state.controls.additional.config.placeholder}
                    type={this.state.controls.additional.config.type}
                  />
                </Grid>
              </MuiThemeProvider>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItemButton}>
            {this.state.isIncomplete ? (
              <Typography className={classes.tyError}>Complete todos los campos</Typography>
            ) : (
              ''
            )}
            {this.props.errorNewService ? (
              <Typography className={classes.tyError}>Hubo un problema</Typography>
            ) : (
              ''
            )}
            <Button className={classes.button} onClick={this.submitHandler}>
              Guardar
            </Button>
          </Grid>
        </Paper>
        {this.props.loadingNewService && <LoaderDialog />};
      </div>
    )
  }
}

const mapStateToProps = ({ proveedores }) => {
  return {
    loadingNewService: proveedores.loadingNewService,
    createdNewService: proveedores.createdNewService,
    errorNewService: proveedores.errorNewService
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createService
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
  )(withErrorHandler(NuevoServicio, axios))
)
