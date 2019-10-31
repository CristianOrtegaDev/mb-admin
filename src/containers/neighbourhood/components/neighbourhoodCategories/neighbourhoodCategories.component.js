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
import themeStyles from './neighbourhoodCategories.theme.style'
import names from '../../names.json'

class NeighbourhoodCategories extends Component {
  state = {
    categoriesFromProps: this.props.categories,
    categories: [],
    neighbourhoodCategories: this.props.neighbourhoodCategories
  }

  handleChange = event => {
    this.setState({ categories: event.target.value })
    this.setState({ categoriesFromProps: event.target.value })
    this.state.neighbourhoodCategories(event.target.value)
  }

  checkData = () => this.state.categoriesFromProps.length && !this.state.categories.length

  checkSelectedData = category => {
    if (this.checkData()) {
      return this.state.categoriesFromProps.indexOf(category) > -1
    } else {
      return this.state.categories.indexOf(category) > -1
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
                value={this.checkData() ? this.state.categoriesFromProps : this.state.categories}
                onChange={this.handleChange}
                input={<Input id="select-multiple-placeholder" />}
                renderValue={selected => {
                  if (selected.length === 0) {
                    return <em className={classes.emHint}>Categorías</em>
                  }

                  return selected.join(', ')
                }}
                MenuProps={{ classes: { paper: classes.menuProps } }}
              >
                <MenuItem disabled value="">
                  <em className={classes.emHint}>Categorías</em>
                </MenuItem>
                {names.map(category => (
                  <MenuItem key={category} value={category}>
                    <CustomCheckbox checked={this.checkSelectedData(category)} />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MuiThemeProvider>
        </Grid>
        <Grid item xs={4} className={classes.gridItemAvatars}>
          {this.checkData() ? (
            <div className={classes.divWrapper}>
              {this.state.categoriesFromProps.map(category => (
                <Tooltip title={category} key={category}>
                  {category.avatar_url ? (
                    <Avatar className={classes.avatar} src={category.avatar_url} />
                  ) : (
                    //TODO ----> Replace hardcoded charAt by the proper
                    //one fetched from api {category.description.charAt(0)}
                    <Avatar className={classes.avatar}>{category.charAt(0).toUpperCase()}</Avatar>
                  )}
                </Tooltip>
              ))}
            </div>
          ) : (
            <div className={classes.divWrapper}>
              {this.state.categories.map(category => (
                <Tooltip title={category} key={category}>
                  {category.avatar_url ? (
                    <Avatar className={classes.avatar} src={category.avatar_url} />
                  ) : (
                    //TODO ----> Replace hardcoded charAt by the proper
                    //one fetched from api {category.description.charAt(0)}
                    <Avatar className={classes.avatar}>{category.charAt(0).toUpperCase()}</Avatar>
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

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(NeighbourhoodCategories)
