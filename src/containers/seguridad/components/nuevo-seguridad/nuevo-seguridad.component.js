import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  withWidth,
  withStyles,
  Button,
  Typography,
  Paper,
  MuiThemeProvider,
  TextField,
  createMuiTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import compose from 'recompose/compose'
import themeStyles from './nuevo-seguridad.theme.style'
import axios from 'axios'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { updateObject, checkValidity, capitalizeFirstLetter } from 'shared/utility'
import AddButton from 'shared/addImgButton/addImgButton'
import LoaderDialog from 'components/loaders/loaderDialog'
import { bindActionCreators } from 'redux'
import { createSecurityStaff } from 'store/actions/securityStaff.actions'
import Section from 'components/Section'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 560px;
  margin-bottom: 20px;
`

class NuevoSeguridad extends Component {
  state = {
    selectedPictureBase64: '',
    selectedPicture: null,
    isIncomplete: false,
    error: {
      dni: false,
      phone: false
    },
    controls: {
      userName: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Nombre de Usuario'
        },
        validation: {
          required: true
        }
      },
      name: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Nombres'
        },
        validation: {
          required: true
        }
      },
      gender: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Género'
        },
        validation: {
          required: true
        }
      },

      familyName: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Apellidos'
        },
        validation: {
          required: true
        }
      },
      dni: {
        value: '',
        config: {
          type: 'number',
          placeholder: 'DNI'
        },
        validation: {
          required: true
        }
      },
      phone: {
        value: '',
        config: {
          type: 'number',
          placeholder: 'Teléfono'
        },
        validation: {
          required: true
        }
      },
      email: {
        value: '',

        config: {
          type: 'email',
          placeholder: 'Email'
        },
        validation: {
          isEmail: true
        }
      }
    },
    onHandleClose: this.props.onHandleClose
  }

  onHandleClose = () => {
    if (this.onHandleClose) {
      this.state.onHandleClose()
    }
  }

  getImageBase64 = (img, img64) =>
    this.setState({ selectedPicture: img, selectedPictureBase64: img64 })

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),

        touched: true
      })
    })
    const error = this.validateErrorByKey(controlName, event.target.value)
    this.setState({
      controls: updatedControls,
      error: { ...this.state.error, [controlName]: error }
    })
  }

  selectionChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    })
    this.setState({ controls: updatedControls })
  }

  checkStaffData = data =>
    Object.keys(data).every(e => (typeof data[e] === 'number' || data[e].length ? true : false))

  checkTextField = (lengthFrom, lengthTo, value) =>
    !(value.length >= lengthFrom && value.length <= lengthTo) || !value

  hasAnyErrors = () => Object.values(this.state.error).find(e => e)

  submitHandler = async event => {
    event.preventDefault()
    const newStaffData = {
      picture_base64: this.state.selectedPictureBase64,
      picture_extension: 'png',
      username: this.state.controls.userName.value,
      name: this.state.controls.name.value,
      surname: capitalizeFirstLetter(this.state.controls.familyName.value),
      dni: this.state.controls.dni.value,
      email: this.state.controls.email.value,
      phone_number: `+${this.state.controls.phone.value}`,
      password:
        capitalizeFirstLetter(this.state.controls.familyName.value).substring(0, 3) +
        '@' +
        this.state.controls.dni.value.substring(0, 4)
    }

    if (
      this.checkStaffData(newStaffData) &&
      this.state.controls.email.valid &&
      !this.hasAnyErrors()
    ) {
      this.setState({ isIncomplete: false })
      await this.props.createSecurityStaff(newStaffData)
      if (this.props.createdNewStaff) this.props.onHandleClose(true)
    } else {
      this.setState({ isIncomplete: true })
    }
  }

  validateErrorByKey = (controlName, value) => {
    if (controlName === 'dni') {
      return this.checkTextField(8, 9, value)
    } else if (controlName === 'phone') {
      return this.checkTextField(13, 13, value)
    } else {
      return false
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

    return (
      <Wrapper>
        <Section title={'Nuevo Personal de Seguridad'} onBack={this.onHandleClose}>
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12} className={classes.gridItemForm}>
                <AddButton returnImageBase64={this.getImageBase64} />
                <MuiThemeProvider theme={theme}>
                  <TextField
                    className={classes.textField}
                    label="User Name:"
                    value={this.state.controls.userName.value}
                    required={this.state.controls.userName.validation.required}
                    onChange={e => this.inputChangedHandler(e, 'userName')}
                    placeholder={this.state.controls.userName.config.placeholder}
                    type={this.state.controls.userName.config.type}
                  />

                  <TextField
                    className={classes.textField}
                    label="Nombre:"
                    value={this.state.controls.name.value}
                    required={this.state.controls.name.validation.required}
                    onChange={e => this.inputChangedHandler(e, 'name')}
                    placeholder={this.state.controls.name.config.placeholder}
                    type={this.state.controls.name.config.type}
                  />

                  <TextField
                    className={classes.textField}
                    label="Apellido:"
                    value={this.state.controls.familyName.value}
                    required={this.state.controls.familyName.validation.required}
                    onChange={e => this.inputChangedHandler(e, 'familyName')}
                    placeholder={this.state.controls.familyName.config.placeholder}
                    type={this.state.controls.familyName.config.type}
                  />

                  <TextField
                    className={classes.textField}
                    error={this.state.error.dni}
                    label={!this.state.error.dni ? 'DNI:' : 'DNI incorrecto:'}
                    value={this.state.controls.dni.value}
                    required={this.state.controls.dni.validation.required}
                    onChange={e => this.inputChangedHandler(e, 'dni')}
                    placeholder={this.state.controls.dni.config.placeholder}
                    type={this.state.controls.dni.config.type}
                  />

                  <FormControl className={classes.formControl}>
                    <InputLabel>Genero</InputLabel>
                    <Select
                      value={this.state.controls.gender.value}
                      onChange={e => this.selectionChangedHandler(e, 'gender')}
                      inputProps={{
                        name: 'gender',
                        id: 'gender-simple'
                      }}
                    >
                      <MenuItem value="">
                        <em>----</em>
                      </MenuItem>
                      <MenuItem value={0}>Femenino</MenuItem>
                      <MenuItem value={1}>Masculino</MenuItem>
                      <MenuItem value={2}>Otros</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    className={classes.textField}
                    error={this.state.error.phone}
                    label={!this.state.error.phone ? 'Teléfono:' : 'Teléfono: incorrecto:'}
                    value={this.state.controls.phone.value}
                    required={this.state.controls.phone.validation.required}
                    onChange={e => this.inputChangedHandler(e, 'phone')}
                    placeholder={this.state.controls.phone.config.placeholder}
                    type={this.state.controls.phone.config.type}
                  />
                  {!this.state.controls.phone.value ? (
                    ''
                  ) : (
                    <Typography className={classes.tyHintPhone}>Ejemplo:(54911********)</Typography>
                  )}

                  <TextField
                    className={classes.textField}
                    error={
                      this.state.controls.email.value === '' || this.state.controls.email.valid
                        ? false
                        : true
                    }
                    label={
                      this.state.controls.email.value === '' || this.state.controls.email.valid
                        ? 'Email:'
                        : 'Email incorrecto:'
                    }
                    value={this.state.controls.email.value}
                    required={this.state.controls.email.validation.required}
                    onChange={e => this.inputChangedHandler(e, 'email')}
                    placeholder={this.state.controls.email.config.placeholder}
                    type={this.state.controls.email.config.type}
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
              {this.props.errorNewStaff ? (
                <Typography className={classes.tyError}>Hubo un problema</Typography>
              ) : (
                ''
              )}
              <Button className={classes.button} onClick={this.submitHandler}>
                Crear
              </Button>
            </Grid>
          </Paper>
          {this.props.loadingNewStaff && <LoaderDialog />}
        </Section>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ securityStaff }) => {
  return {
    loadingNewStaff: securityStaff.loadingNewStaff,
    createdNewStaff: securityStaff.createdNewStaff,
    errorNewStaff: securityStaff.errorNewStaff
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createSecurityStaff
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
  )(withErrorHandler(NuevoSeguridad, axios))
)
