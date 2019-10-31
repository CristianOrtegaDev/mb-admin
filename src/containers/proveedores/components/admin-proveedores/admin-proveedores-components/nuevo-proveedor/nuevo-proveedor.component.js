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
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Divider
} from '@material-ui/core'
import themeStyles from './nuevo-proveedor.theme.style'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Spinner from 'react-spinner-material'
import axios from 'axios'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import { updateObject, checkValidity, capitalizeFirstLetter } from 'shared/utility'
import Delete from '@material-ui/icons/Delete'
import Add from '@material-ui/icons/Add'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AddButton from 'shared/addImgButton/addImgButton'
import { bindActionCreators } from 'redux'
import {
  createSupplier,
  fetchCategorias,
  fetchNeighbourhoods
} from 'store/actions/proveedores.actions'
import LoaderDialog from 'components/loaders/loaderDialog'

class NuevoProveedor extends Component {
  state = {
    selectedPictureBase64: '',
    selectedPicture: null,
    isIncomplete: false,
    error: {
      dni: false,
      phone: false
    },
    controls: {
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
      last_name: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Apellido'
        },
        validation: {
          required: true
        }
      },
      username: {
        value: '',
        config: {
          type: 'text',
          placeholder: 'Nombre de Usuario'
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
    onHandleClose: this.props.onClose,
    categories: [
      {
        category_id: '',
        neighbourhood_code: '',
        times: [{ id: 0, day_of_week: '', time_from: '', time_to: '' }]
      }
    ]
  }

  componentDidMount() {
    this.props.fetchNeighbourhoods()
  }

  onHandleClose = () => {
    if (this.state.onHandleClose) {
      this.state.onHandleClose()
    }
  }

  handleChangeDateTo = (event, idx, categoryId) => {
    var dateISO = this.transformToISO(event)
    const categories = this.state.categories.map(category => {
      if (category.category_id === categoryId)
        category.times = this.updateDateValueByKey(category, dateISO, idx, 'time_to')
      return category
    })
    this.setState({ categories })
  }

  handleChangeDateFrom = (event, idx, categoryId) => {
    var dateISO = this.transformToISO(event)
    const categories = this.state.categories.map(category => {
      if (category.category_id === categoryId)
        category.times = this.updateDateValueByKey(category, dateISO, idx, 'time_from')
      return category
    })
    this.setState({ categories })
  }

  handleChangeDay = (event, idx, categoryId) => {
    const categories = this.state.categories.map(category => {
      if (category.category_id === categoryId)
        category.times = this.updateDateValueByKey(category, event.target.value, idx, 'day_of_week')
      return category
    })
    this.setState({ categories })
  }

  updateDateValueByKey = (category, newDateRange, dateRangePos, key) =>
    category.times.map((date, dateIndex) =>
      dateRangePos === dateIndex ? { ...date, [key]: newDateRange } : date
    )

  transformToISO = date => {
    var tzoffset = new Date().getTimezoneOffset() * 60000
    var dateISO = new Date(date - tzoffset).toISOString().slice(0, -1)
    return dateISO
  }

  handleChangeCategory = (event, idx) => {
    const newCategory = this.state.categories.map((category, cidx) => {
      if (idx !== cidx) {
        return category
      } else {
        return { ...category, category_id: event.target.value }
      }
    })
    this.setState({ categories: newCategory })
  }

  handleChangeNeighborhood = (event, idx) => {
    const newCategory = this.state.categories.map((category, cidx) => {
      if (idx !== cidx) {
        return category
      } else {
        return { ...category, neighbourhood_code: event.target.value }
      }
    })
    this.setState({ categories: newCategory })
    this.props.fetchCategorias(event.target.value)
  }

  handleAddOpenTime = idx => {
    this.state.categories.map((category, cidx) => {
      if (cidx === idx)
        category.times.push({
          id: 0,
          day_of_week: '',
          time_from: '',
          time_to: ''
        })
    })
    this.setState({ categories: this.state.categories })
  }

  handleAddCategory = () => {
    this.state.categories.push({
      category_id: '',
      neighbourhood_code: '',
      times: [{ id: 0, day_of_week: '', time_from: '', time_to: '' }]
    })

    this.setState({ categories: this.state.categories })
  }

  handleRemoveOpenTime = (tidx, idx) => {
    this.state.categories.map((category, cidx) => {
      if (cidx === idx) category.times.splice(tidx, 1)
    })

    this.setState({ categories: this.state.categories })
  }

  handleRemoveCategory = idx => {
    this.state.categories.splice(idx, 1)
    this.setState({ categories: this.state.categories })
  }

  getImageBase64 = (img, img64) =>
    this.setState({ selectedPicture: img, selectedPictureBase64: img64 })

  checkSupplierData = data =>
    Object.keys(data).every(e => (typeof data[e] === 'number' || data[e].length ? true : false))

  checkSupplierCategories = date =>
    date.find(e => e.category_id === '' || e.neighbourhood_code === '' || e.times.length === 0)

  hasAnyErrors = () => Object.values(this.state.error).find(e => e)

  submitHandler = async event => {
    event.preventDefault()
    const newSupplierData = {
      name: this.state.controls.name.value,
      last_name: capitalizeFirstLetter(this.state.controls.last_name.value),
      telephone: `+${this.state.controls.phone.value}`,
      username: this.state.controls.username.value,
      email: this.state.controls.email.value,
      dni: this.state.controls.dni.value,
      gender: this.state.controls.gender.value,
      profile_picture: this.state.selectedPictureBase64,
      password:
        capitalizeFirstLetter(this.state.controls.last_name.value).substring(0, 3) +
        '@' +
        this.state.controls.dni.value.substring(0, 4)
    }
    const categories = this.state.categories

    if (
      this.checkSupplierData(newSupplierData) &&
      !this.checkSupplierCategories(categories) &&
      !this.hasAnyErrors() &&
      this.state.controls.email.valid
    ) {
      this.setState({ isIncomplete: false })
      await this.props.createSupplier({ ...newSupplierData, categories })
      if (this.props.createdNewSupplier) this.onHandleClose()
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
    const error = this.validateErrorByKey(controlName, event.target.value)
    this.setState({
      controls: updatedControls,
      error: { ...this.state.error, [controlName]: error }
    })
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

  checkTextField = (lengthFrom, lengthTo, value) =>
    !(value.length >= lengthFrom && value.length <= lengthTo) || !value

  render() {
    const theme = createMuiTheme({
      palette: {
        primary: { 500: '#1873f3' } //theme.palette.common.blue
      },
      typography: { useNextVariants: true }
    })
    const { classes } = this.props

    const days = [
      {
        value: '0',
        label: 'Domingo'
      },
      {
        value: '1',
        label: 'Lunes'
      },
      {
        value: '2',
        label: 'Martes'
      },
      {
        value: '3',
        label: 'Miercoles'
      },
      {
        value: '4',
        label: 'Jueves'
      },
      {
        value: '5',
        label: 'Viernes'
      },
      {
        value: '6',
        label: 'Sábado'
      }
    ]

    return (
      <div>
        <Grid item className={classes.gridButtonBack}>
          <Button onClick={this.onHandleClose} className={classes.ButtonBack} variant="fab">
            <ArrowBack className={classes.IconBack} />
          </Button>
        </Grid>
        <Typography className={classes.tyTitle}>Nuevo Proveedor</Typography>
        <Paper className={classes.paper}>
          <Grid container className={classes.gridContainerMain}>
            <AddButton returnImageBase64={this.getImageBase64} />
            <MuiThemeProvider theme={theme}>
              <Grid container className={classes.gridContainerWrappForms}>
                <Grid container className={classes.gridContainerForm}>
                  <Grid item xs={6} className={classes.gridItemWrappTextFields}>
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
                      label="Nombre de Usuario:"
                      value={this.state.controls.username.value}
                      required={this.state.controls.username.validation.required}
                      onChange={e => this.inputChangedHandler(e, 'username')}
                      placeholder={this.state.controls.username.config.placeholder}
                      type={this.state.controls.username.config.type}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={6} className={classes.gridItemWrappTextFields}>
                    <TextField
                      className={classes.textField}
                      label="Apellido:"
                      value={this.state.controls.last_name.value}
                      required={this.state.controls.last_name.validation.required}
                      onChange={e => this.inputChangedHandler(e, 'last_name')}
                      placeholder={this.state.controls.last_name.config.placeholder}
                      type={this.state.controls.last_name.config.type}
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
                  </Grid>
                </Grid>

                <Grid container className={classes.gridContainerForm}>
                  <Grid item xs={6} className={classes.gridItemWrappTextFields}>
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
                      <Typography className={classes.tyHintPhone}>
                        Ejemplo:(54911********)
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} className={classes.gridItemWrappTextFields}>
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
                  </Grid>
                </Grid>
              </Grid>
            </MuiThemeProvider>
            <Divider className={classes.divider} />
            <Grid container className={classes.gridContainerDynamicForm}>
              {this.state.categories.map((category, idx) => (
                <Grid key={idx} item xs={10} className={classes.gridItemWrappCategory}>
                  <Grid item xs={10} className={classes.gridItemColumn}>
                    {this.props.loadingNeighbourhood ? (
                      <Spinner />
                    ) : (
                      <Grid item>
                        <MuiThemeProvider theme={theme}>
                          <TextField
                            className={classes.txfDay}
                            select
                            label="Barrio"
                            value={category.neighbourhood_code}
                            onChange={e => this.handleChangeNeighborhood(e, idx)}
                          >
                            {this.props.neighbourhoodList.map(categ => (
                              <MenuItem key={categ.id} value={categ.guid}>
                                {categ.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </MuiThemeProvider>
                      </Grid>
                    )}
                    {category.neighbourhood_code ? (
                      <div>
                        {this.props.loadingCategorias ? (
                          <Spinner />
                        ) : (
                          <Grid item>
                            <MuiThemeProvider theme={theme}>
                              <TextField
                                className={classes.txfDay}
                                select
                                label="Categoría"
                                value={category.category_id}
                                onChange={e => this.handleChangeCategory(e, idx)}
                              >
                                {this.props.categoriasList.map(categ => (
                                  <MenuItem key={categ.id} value={categ.id}>
                                    {categ.description}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </MuiThemeProvider>
                          </Grid>
                        )}
                        {category.category_id ? (
                          <div>
                            {' '}
                            <Grid container className={classes.gridContainerTimes}>
                              {category.times.map((openTime, tidx) => (
                                <Grid key={tidx} item xs={10} className={classes.gridItemFlex}>
                                  <Grid item xs={10} className={classes.gridItemColumn}>
                                    <Grid item xs={12} className={classes.gridItemDay}>
                                      <MuiThemeProvider theme={theme}>
                                        <TextField
                                          disabled={category.category_id === ''}
                                          className={classes.txfDay}
                                          select
                                          label="Dia"
                                          value={openTime.day_of_week}
                                          onChange={e =>
                                            this.handleChangeDay(e, tidx, category.category_id)
                                          }
                                        >
                                          {days.map(day => (
                                            <MenuItem key={day.value} value={day.value}>
                                              {day.label}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                      </MuiThemeProvider>
                                    </Grid>
                                    <Grid item xs={12} className={classes.gridItemHours}>
                                      <div>
                                        <DatePicker
                                          disabled={category.category_id === ''}
                                          className={classes.datePicker}
                                          selected={openTime.time_from}
                                          onChange={e =>
                                            this.handleChangeDateFrom(e, tidx, category.category_id)
                                          }
                                          showTimeSelect
                                          showTimeSelectOnly
                                          timeFormat="HH:mm"
                                          dateFormat="h:mm aa"
                                          placeholderText="Desde"
                                          timeCaption="time"
                                        />
                                      </div>
                                      <div>
                                        <DatePicker
                                          disabled={category.category_id === ''}
                                          className={classes.datePicker}
                                          selected={openTime.time_to}
                                          onChange={e =>
                                            this.handleChangeDateTo(e, tidx, category.category_id)
                                          }
                                          showTimeSelect
                                          showTimeSelectOnly
                                          timeFormat="HH:mm"
                                          dateFormat="h:mm aa"
                                          placeholderText="Hasta"
                                          timeCaption="time"
                                        />
                                      </div>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2} className={classes.gridItemWrappRemove}>
                                    <Fab
                                      className={classes.buttonFabRemove}
                                      onClick={() => this.handleRemoveOpenTime(tidx, idx)}
                                    >
                                      <Delete className={classes.iconDelete} />
                                    </Fab>
                                  </Grid>
                                </Grid>
                              ))}
                              <Grid item xs={2} className={classes.gridItemWrappAdd}>
                                <Fab
                                  className={classes.buttonFabAdd}
                                  onClick={() => this.handleAddOpenTime(idx)}
                                >
                                  <Add className={classes.iconAdd} />
                                </Fab>
                              </Grid>
                            </Grid>
                          </div>
                        ) : (
                          'Seleccione Categoria'
                        )}
                      </div>
                    ) : (
                      'Seleccione un Barrio'
                    )}
                  </Grid>
                  <Grid item xs={2} className={classes.gridItemWrappRemove}>
                    <Fab
                      className={classes.buttonFabRemove}
                      onClick={() => this.handleRemoveCategory(idx)}
                    >
                      <Delete className={classes.iconDelete} />
                    </Fab>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={2} className={classes.gridItemWrappAdd}>
                <Fab className={classes.buttonFabAdd} onClick={this.handleAddCategory}>
                  <Add className={classes.iconAdd} />
                </Fab>
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.gridItemButton}>
            {this.state.isIncomplete ? (
              <Typography className={classes.tyError}>Complete todos los campos</Typography>
            ) : (
              ''
            )}
            {this.props.errorNewSupplier ? (
              <Typography className={classes.tyError}>Hubo un problema</Typography>
            ) : (
              ''
            )}

            <Button className={classes.button} onClick={this.submitHandler}>
              Guardar
            </Button>
          </Grid>
        </Paper>
        {this.props.loadingNewSupplier && <LoaderDialog />};
      </div>
    )
  }
}

const mapStateToProps = ({ proveedores }) => {
  return {
    categoriasList: proveedores.categoriasList,
    loadingCategorias: proveedores.loadingCategorias,
    neighbourhoodList: proveedores.neighbourhoodList,
    loadingNeighbourhood: proveedores.loadingNeighbourhood,
    createdNewSupplier: proveedores.createdNewSupplier,
    loadingNewSupplier: proveedores.loadingNewSupplier,
    errorNewSupplier: proveedores.errorNewSupplier
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCategorias,
      fetchNeighbourhoods,
      createSupplier
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
  )(withErrorHandler(NuevoProveedor, axios))
)
