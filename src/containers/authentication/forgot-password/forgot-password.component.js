import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { withStyles } from '@material-ui/core/styles'

import themeStyles from './forgot-password.theme.style'
import scss from './forgot-password.module.scss'

const Forgot = props => {
  const { classes } = props

  return (
    <Grid
      container
      direction="row"
      spacing={0}
      justify="center"
      alignItems="center"
      className={classes.background}
    >
      <Grid item sm={6} xs={12} className={scss.panel}>
        <Grid direction="column" container spacing={0}>
          <Grid item xs={12}>
            <Card className={classNames(scss.card, classes['primary-card'])}>
              <CardContent className={scss['signup-content']}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Recuperación de Password
                </Typography>
                <Typography component="p" gutterBottom>
                  Por favor ingrese su mail. Recibirá un link para crear un nuevo password.
                </Typography>
              </CardContent>
            </Card>
            <Card className={scss.card}>
              <CardContent>
                <TextField label="Dirección de Correo Electrónico" fullWidth />
              </CardContent>
              <CardActions className={scss['lock-actions']}>
                <Button href="/forgot-password" color="primary" variant="raised">
                  Reestablecer Contraseña
                </Button>
                <Button href="/login">Volver al Ingreso</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

Forgot.propTypes = {
  classes: PropTypes.shape({}).isRequired
}

export default withStyles(themeStyles, { withTheme: true })(Forgot)
