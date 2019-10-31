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
import themeStyles from './nueva-categoria.theme.style'
import ArrowBack from '@material-ui/icons/ArrowBack'
import axios from 'axios'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { updateObject, checkValidity } from 'shared/utility'
import { bindActionCreators } from 'redux'
import { createNewCategory } from 'store/actions/proveedores.actions'
import LoaderDialog from 'components/loaders/loaderDialog'

class NuevaCategoria extends Component {
  state = {
    isIncomplete: false,
    controls: {
      name: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Nombre de la categoría'
        }
      }
    },
    onHandleClose: this.props.onClose
  }

  onHandleClose = () => {
    if (this.state.onHandleClose) {
      this.state.onHandleClose()
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

  submitHandler = async event => {
    event.preventDefault()
    const newCategoryData = {
      description: this.state.controls.name.value
    }

    if (newCategoryData.description) {
      this.setState({ isIncomplete: false })
      await this.props.createNewCategory(newCategoryData)
      if (this.props.createdNewCategory) this.onHandleClose()
    } else {
      this.setState({ isIncomplete: true })
    }
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { 500: '#1873f3' } //theme.palette.common.blue
      },
      typography: { useNextVariants: true }
    })
    const { classes } = this.props

    if (this.props.created) {
      this.onHandleClose()
    }

    return (
      <div>
        <Grid item className={classes.gridButtonBack}>
          <Button onClick={this.onHandleClose} className={classes.ButtonBack} variant="fab">
            <ArrowBack className={classes.IconBack} />
          </Button>
        </Grid>
        <Typography className={classes.tyTitle}>Nueva Categoria</Typography>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12} className={classes.gridItemForm}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  label="Categoria:"
                  value={this.state.controls.name.value}
                  onChange={e => this.inputChangedHandler(e, 'name')}
                  placeholder={this.state.controls.name.config.placeholder}
                  type={this.state.controls.name.config.type}
                  className={classes.textField}
                />
              </MuiThemeProvider>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItemButton}>
            {this.state.isIncomplete ? (
              <Typography className={classes.tyError}>Complete todos los campos</Typography>
            ) : (
              ''
            )}
            {this.props.errorNewCategory ? (
              <Typography className={classes.tyError}>Hubo un problema</Typography>
            ) : (
              ''
            )}

            <Button className={classes.button} onClick={this.submitHandler}>
              Guardar
            </Button>
          </Grid>
        </Paper>
        {this.props.loadingNewCategory && <LoaderDialog />};
      </div>
    )
  }
}

const mapStateToProps = ({ proveedores }) => {
  return {
    loadingNewCategory: proveedores.loadingNewCategory,
    createdNewCategory: proveedores.createdNewCategory,
    errorNewCategory: proveedores.errorNewCategory
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createNewCategory
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
  )(withErrorHandler(NuevaCategoria, axios))
)
