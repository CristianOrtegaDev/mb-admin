import React, { Component } from 'react'
import {
  Typography,
  withStyles,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import withWidth from '@material-ui/core/withWidth'
import themeStyles from './neighbourhood.theme.styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { compose, bindActionCreators } from 'redux'
import NameComponent from './components/neighbourhoodName/neighbourhoodName.component'
import CategoriesComponent from './components/neighbourhoodCategories/neighbourhoodCategories.component'
import ActivitiesComponent from './components/neighbourhoodActivities/neighbourhoodActivities.component'
import ResumeComponent from './components/neighbourhoodResume/neighbourhoodResume.component'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import axios from 'axios'
import { fetchNeighbourhoods } from 'store/actions/proveedores.actions'
import { fetchDefaultActivities, fetchDefaultCategories } from 'store/actions/neighbourhood.actions'
import LoaderDialog from 'components/loaders/loaderDialog'
import CircularProgress from '@material-ui/core/CircularProgress'

function getSteps() {
  return ['Nombre del Barrio', 'Categorías por defecto', 'Actividades por defecto']
}

class Neighbourhood extends Component {
  state = {
    activeStep: 0,
    neighbourhoodName: '',
    neighbourhoodCategories: [],
    neighbourhoodActivities: [],
    // TODO --> Remove this Mock state implementation for DEMO
    onError: false,
    isSubmitting: false,
    redirect: false
  }

  componentDidMount() {
    this.props.fetchNeighbourhoods()
    this.props.fetchDefaultActivities()
    // TODO --> Add the real endpoint
    //this.props.fetchDefaultCategories()
  }

  neighbourhoodName = name => this.setState({ neighbourhoodName: name })

  neighbourhoodCategories = category => this.setState({ neighbourhoodCategories: category })

  neighbourhoodActivities = activity => this.setState({ neighbourhoodActivities: activity })

  onError = bool => this.setState({ onError: bool })

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <NameComponent
            neighbourhoodName={this.neighbourhoodName}
            name={this.state.neighbourhoodName}
            onError={this.onError}
          />
        )
      case 1:
        return (
          <CategoriesComponent
            neighbourhoodCategories={this.neighbourhoodCategories}
            categories={this.state.neighbourhoodCategories}
          />
        )
      case 2:
        return (
          <ActivitiesComponent
            neighbourhoodActivities={this.neighbourhoodActivities}
            activities={this.state.neighbourhoodActivities}
          />
        )
      default:
        return (
          <ResumeComponent
            name={this.state.neighbourhoodName}
            categories={this.state.neighbourhoodCategories}
            activities={this.state.neighbourhoodActivities}
          />
        )
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      neighbourhoodName: '',
      neighbourhoodCategories: [],
      neighbourhoodActivities: []
    })
  }

  checkError = () =>
    this.props.errorFetchDefaultActivities ||
    this.props.errorFetchDefaultCategories ||
    this.props.errorFetchNeighbourhoods ||
    this.state.onError

  checkLoading = () =>
    this.props.loadingDefaultActivities ||
    this.props.loadingDefaultCategories ||
    this.props.loadingNeighbourhood

  // TODO --> Remove this Mock state implementation for DEMO
  handleOnClick = () => {
    this.setState({ isSubmitting: true })
    window.setTimeout(() => {
      this.setState({ isSubmitting: false, success: true })
      window.setTimeout(() => {
        this.setState({ redirect: true })
      }, 2000)
    }, 2000)
  }

  render() {
    const { classes } = this.props
    const steps = getSteps()
    const { activeStep } = this.state

    const theme = createMuiTheme({
      StepIconProps: {
        classes: {
          completed: { color: classes.stepper }
        }
      }
    })
    // TODO --> Remove this Mock state implementation for DEMO
    let homeRedirect = null
    if (this.state.redirect) {
      homeRedirect = <Redirect to={'/'} />
    }

    return (
      <Grid container className={classes.gridContainer}>
        {homeRedirect}
        <Grid item className={classes.gridItem}>
          <Typography className={classes.tyTitle}>Crear Barrio</Typography>
        </Grid>
        <Paper className={classes.paper}>
          <Grid container className={classes.gridContainerStepper}>
            <Grid item className={classes.gridItemStepper}>
              <MuiThemeProvider theme={theme}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel
                        StepIconProps={{
                          classes: {
                            completed: classes.myComplete,
                            active: classes.myActive
                          }
                        }}
                        classes={{
                          iconContainer: classes.sarasa
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </MuiThemeProvider>
            </Grid>
            <Grid item>
              <Typography className={classes.instructions}>
                {this.getStepContent(activeStep)}
              </Typography>
            </Grid>

            <Grid container className={classes.gridContainerButtons}>
              {this.state.activeStep === steps.length ? (
                <Grid item className={classes.gridItemButtons}>
                  <Button
                    onClick={this.handleReset}
                    className={classes.buttonReset}
                    // TODO --> Remove this Mock state implementation for DEMO
                    disabled={this.state.isSubmitting || this.state.success}
                  >
                    <DeleteIcon />
                  </Button>

                  <Button
                    className={classes.buttonSave}
                    onClick={this.handleOnClick}
                    // TODO --> Remove this Mock state implementation for DEMO
                    disabled={this.state.isSubmitting || this.state.success}
                  >
                    {this.state.isSubmitting ? (
                      <CircularProgress className={classes.progress} size={28} />
                    ) : this.state.success ? (
                      'Exito!'
                    ) : (
                      'Crear'
                    )}
                  </Button>
                </Grid>
              ) : (
                <Grid item className={classes.gridItemButtons}>
                  {this.checkError() ? (
                    <Typography className={classes.tyError}>Hubo un error</Typography>
                  ) : (
                    ''
                  )}
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.buttonBack}
                  >
                    Atras
                  </Button>
                  <Button
                    onClick={this.handleNext}
                    className={classes.buttonNext}
                    disabled={this.checkError()}
                  >
                    Próximo
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
        {this.checkLoading() && <LoaderDialog />}
      </Grid>
    )
  }
}

const mapStateToProps = ({ proveedores, neighbourhood }) => {
  return {
    neighbourhoodList: proveedores.neighbourhoodList,
    loadingNeighbourhood: proveedores.loadingNeighbourhood,
    errorFetchNeighbourhoods: proveedores.errorFetchNeighbourhoods,
    defaultActivitiesList: neighbourhood.defaultActivitiesList,
    loadingDefaultActivities: neighbourhood.loadingDefaultActivities,
    errorFetchDefaultActivities: neighbourhood.errorFetchDefaultActivities,
    defaultCategoriesList: neighbourhood.defaultCategoriesList,
    loadingDefaultCategories: neighbourhood.loadingDefaultCategories,
    errorFetchDefaultCategories: neighbourhood.errorFetchDefaultCategories
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchNeighbourhoods,
      fetchDefaultActivities,
      fetchDefaultCategories
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
  )(withErrorHandler(Neighbourhood, axios))
)
