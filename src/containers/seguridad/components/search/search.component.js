import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Grid,
  Card,
  withWidth,
  withStyles,
  createMuiTheme,
  TextField,
  MuiThemeProvider,
  InputAdornment,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography
} from '@material-ui/core'
import compose from 'recompose/compose'
import themeStyles from './search.theme.style'
import SearchIcon from '@material-ui/icons/Search'
import { bindActionCreators } from 'redux'
import { filterSearchChanged } from 'store/actions/securityStaff.actions'

class Search extends Component {
  handleChange = event => {
    const filter = event.target.value
    this.props.filterSearchChanged(filter)
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
      <Grid container className={classes.gridContainerHeader}>
        <Card className={classes.cardContainerActions}>
          <div className={classes.cardActions}>
            <FormControl component="fieldset" className={classes.formControl}>
              <Typography className={classes.tySearchTitle}>Busque por: </Typography>
              <RadioGroup
                value={this.props.filter}
                onChange={this.handleChange}
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value="name"
                  control={
                    <Radio
                      classes={{
                        root: classes.root,
                        checked: classes.checked
                      }}
                    />
                  }
                  label="Nombre"
                />
                <FormControlLabel
                  value="family_name"
                  control={
                    <Radio
                      classes={{
                        root: classes.root,
                        checked: classes.checked
                      }}
                    />
                  }
                  label="Apellido"
                />
              </RadioGroup>
            </FormControl>
            <MuiThemeProvider theme={theme}>
              <TextField
                label="Buscar..."
                id="search"
                variant="outlined"
                fullWidth
                margin="dense"
                onChange={event => this.props.searchHandler(event, this.props.filter)}
                className={classes.portalSearchField}
                InputProps={{
                  classes: { notchedOutline: classes.borderTextfield },
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon className={classes.iconSearch} />
                    </InputAdornment>
                  )
                }}
              />
            </MuiThemeProvider>
          </div>
        </Card>
      </Grid>
    )
  }
}

const mapStateToProps = ({ securityStaff }) => {
  return {
    filter: securityStaff.filter
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      filterSearchChanged
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
  )(Search)
)
