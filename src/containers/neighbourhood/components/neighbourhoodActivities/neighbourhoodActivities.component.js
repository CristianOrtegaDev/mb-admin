import React, { Component } from 'react'
import {
  withWidth,
  withStyles,
  Grid,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  Input,
  Checkbox,
  createMuiTheme,
  MuiThemeProvider,
  Avatar,
  Tooltip
} from '@material-ui/core'
import { compose } from 'recompose'
import classNames from 'classnames'
import themeStyles from './neighbourhoodActivities.theme.style'
import { connect } from 'react-redux'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import axios from 'axios'

class NeighbourhoodActivities extends Component {
  state = {
    activitiesFromProps: this.props.activities,
    activities: [],
    neighbourhoodActivities: this.props.neighbourhoodActivities
  }

  handleChange = event => {
    this.setState({ activities: event.target.value })
    this.setState({ activitiesFromProps: event.target.value })
    this.state.neighbourhoodActivities(event.target.value)
  }

  checkData = () => this.state.activitiesFromProps.length && !this.state.activities.length

  checkSelectedData = activity => {
    if (this.checkData()) {
      return this.state.activitiesFromProps.indexOf(activity) > -1
    } else {
      return this.state.activities.indexOf(activity) > -1
    }
  }

  render() {
    const { classes } = this.props
    const theme = createMuiTheme({
      palette: {
        primary: { 500: '#1873f3' } //theme.palette.common.blue
      }
    })
    const checkBoxStyles = {
      root: {
        '&$checked': {
          color: '#1873f3'
        }
      },
      checked: {}
    }
    const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox)

    return (
      <Grid container className={classes.gridContainer}>
        <Grid item xs={5} className={classes.gridItemForm}>
          <MuiThemeProvider theme={theme}>
            <FormControl className={classNames(classes.formControl, classes.noLabel)}>
              <Select
                className={classes.select}
                multiple
                displayEmpty
                value={this.checkData() ? this.state.activitiesFromProps : this.state.activities}
                onChange={this.handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => {
                  if (selected.length === 0) {
                    return <em className={classes.emHint}>Actividades</em>
                  }
                  return selected.reduce((total, accum) => `${total} ${accum.description}, `, ``)
                }}
                MenuProps={{ classes: { paper: classes.menuProps } }}
              >
                <MenuItem disabled value="">
                  <em className={classes.emHint}>Actividades</em>
                </MenuItem>
                {this.props.defaultActivitiesList.map(activity => (
                  <MenuItem key={activity.description} value={activity}>
                    <CustomCheckbox checked={this.checkSelectedData(activity)} />
                    <ListItemText primary={activity.description} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={4} className={classes.gridItemAvatars}>
          {this.checkData() ? (
            <div className={classes.divWrapper}>
              {this.state.activitiesFromProps.map(activity => (
                <Tooltip title={activity} key={activity}>
                  {activity.avatar_url ? (
                    <Avatar className={classes.avatar} src={activity.avatar_url} />
                  ) : (
                    <Avatar className={classes.avatar}>
                      {activity.description.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </Tooltip>
              ))}
            </div>
          ) : (
            <div className={classes.divWrapper}>
              {this.state.activities.map(activity => (
                <Tooltip title={activity} key={activity}>
                  {activity.avatar_url ? (
                    <Avatar className={classes.avatar} src={activity.avatar_url} />
                  ) : (
                    <Avatar className={classes.avatar}>
                      {activity.description.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </Tooltip>
              ))}
            </div>
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({ neighbourhood }) => {
  return {
    defaultActivitiesList: neighbourhood.defaultActivitiesList,
    loadingDefaultActivities: neighbourhood.loadingDefaultActivities,
    errorFetchDefaultActivities: neighbourhood.errorFetchDefaultActivities
  }
}

export default connect(mapStateToProps)(
  compose(
    withWidth(),
    withStyles(themeStyles, { withTheme: true })
  )(withErrorHandler(NeighbourhoodActivities, axios))
)
