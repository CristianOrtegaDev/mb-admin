import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import classNames from 'classnames'

import themeStyles from './no-proveedores.theme.style'
import scss from './no-proveedores.module.scss'

const NoProveedores = props => {
  const { classes } = props

  return (
    <div className={classNames(scss['users-no-users'], classes['users-no-users'])}>
      <div
        className={classNames(scss['users-no-users__icon'], classes['portal-users-no-users__icon'])}
      >
        <div className={scss['users-no-users__paper']} />
      </div>
      <Typography className={classes.tyLore}>Seleccione un Proveedor</Typography>
    </div>
  )
}

NoProveedores.propTypes = {
  classes: PropTypes.shape({}).isRequired
}

export default withStyles(themeStyles, { withTheme: true })(NoProveedores)
