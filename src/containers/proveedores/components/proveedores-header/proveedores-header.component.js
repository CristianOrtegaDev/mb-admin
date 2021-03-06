import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import themeStyles from './proveedores-header.theme.style'
import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Card from '@material-ui/core/Card'
import { Grid } from '@material-ui/core'

class ProveedoresHeader extends Component {
  state = {
    onOpenAdminCategorias: this.props.onOpenAdminCategorias,
    onOpenAdminProveedores: this.props.onOpenAdminProveedores
  }

  onOpenAdminCategorias = () => {
    this.state.onOpenAdminCategorias()
  }

  onOpenAdminProveedores = () => {
    this.state.onOpenAdminProveedores()
  }

  render() {
    const { classes } = this.props

    return (
      <Grid container style={{}} className={classes.gridContainerHeader}>
        <Grid item className={classes.gridItemHeaderTitle}>
          <Typography className={classes.tyHeaderTitle}>Administrar Proveedores</Typography>
        </Grid>
        <Card className={classes.cardContainerActions}>
          <CardActions className={classes.cardActions}>
            <Button
              className={classes.button}
              onClick={this.onOpenAdminCategorias}
              aria-label="Add"
            >
              Categorias
            </Button>
            <Button
              className={classes.button}
              onClick={this.onOpenAdminProveedores}
              aria-label="Add"
            >
              Proveedores
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

ProveedoresHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(ProveedoresHeader)
