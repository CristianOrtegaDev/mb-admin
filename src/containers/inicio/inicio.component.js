import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import themeStyles from '../components/base/base.theme.style'
import compose from 'recompose/compose'
import classNames from 'classnames'
import withWidth from '@material-ui/core/withWidth'
import scss from '../components/base/base.module.scss'
import Typography from '@material-ui/core/Typography'

class Inicio extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classNames(scss['portal-profile'], classes.background)}>
        <Typography className={scss['portal-profile__header']} variant="h6" color="inherit" noWrap>
          Inicio
        </Typography>
      </div>
    )
  }
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(Inicio)
