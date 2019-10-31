import React, { Component } from 'react'
import {
  withWidth,
  withStyles,
  Grid,
  TextField,
  createMuiTheme,
  MuiThemeProvider,
  Typography
} from '@material-ui/core'
import { compose } from 'recompose'
import themeStyles from './neighbourhoodName.theme.style'
import { connect } from 'react-redux'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import axios from 'axios'

class NeighbourhoodName extends Component {
  state = {
    nameFromProps: this.props.name,
    name: '',
    neighbourhoodName: this.props.neighbourhoodName
  }

  handleChange = event => {
    this.setState({ name: event.target.value })
    this.state.neighbourhoodName(event.target.value)
  }

  checkNeighbourhoodName = () =>
    this.props.neighbourhoodList.find(
      neighbourhood => neighbourhood.name.toLowerCase() === this.state.name.toLowerCase()
    )

  checkError = () => {
    let bool = this.checkNeighbourhoodName()
    this.props.onError(bool)
    return bool
  }

  render() {
    const { classes } = this.props
    const theme = createMuiTheme({
      palette: {
        primary: { 500: '#1873f3' } //theme.palette.common.blue
      },
      typography: { useNextVariants: true }
    })

    return (
      <Grid container className={classes.gridContainer}>
        <MuiThemeProvider theme={theme}>
          <TextField
            className={classes.textField}
            error={this.checkNeighbourhoodName()}
            label="Nombre"
            value={
              this.state.nameFromProps && !this.state.name
                ? this.state.nameFromProps
                : this.state.name
            }
            onChange={e => this.handleChange(e)}
          />
          {this.checkError() && (
            <Typography className={classes.tyError}>Este barrio ya existe</Typography>
          )}
        </MuiThemeProvider>
      </Grid>
    )
  }
}

const mapStateToProps = ({ proveedores }) => {
  return {
    neighbourhoodList: proveedores.neighbourhoodList,
    loadingNeighbourhood: proveedores.loadingNeighbourhood,
    errorFetchNeighbourhoods: proveedores.errorFetchNeighbourhoods
  }
}

export default connect(mapStateToProps)(
  compose(
    withWidth(),
    withStyles(themeStyles, { withTheme: true })
  )(withErrorHandler(NeighbourhoodName, axios))
)
