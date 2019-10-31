import React, { Component } from 'react'
import { Typography, withWidth, withStyles, Grid, Tooltip, Avatar } from '@material-ui/core'
import { compose } from 'recompose'
import themeStyles from './neighbourhoodResume.theme.style'

class NeighbourhoodResume extends Component {
  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography className={classes.tyTitle}>Nombre del barrio: </Typography>
          {this.props.name ? (
            <Typography>{this.props.name}</Typography>
          ) : (
            <Typography>Complete el nombre</Typography>
          )}
        </Grid>
        <Grid item className={classes.gridItem}>
          <Typography className={classes.tyTitle}>Categorías: </Typography>
          {this.props.categories.length ? (
            <div className={classes.divWrapper}>
              {/*//TODO ---> change this hardcoded avatar(names.json) when the endpoint is ready */}
              {this.props.categories.map(category => (
                <Tooltip title={category} key={category}>
                  <Avatar className={classes.avatar}>{category}</Avatar>
                </Tooltip>
              ))}
            </div>
          ) : (
            <Typography>No se selccionó ninguna categoría</Typography>
          )}
        </Grid>
        <Grid item className={classes.gridItem}>
          <Typography className={classes.tyTitle}>Actividades: </Typography>
          {this.props.activities.length ? (
            <div className={classes.divWrapper}>
              {this.props.activities.map(({ description, avatar_url }) => (
                <Tooltip title={description} key={`${description}`}>
                  {avatar_url ? (
                    <Avatar className={classes.avatar} src={avatar_url} />
                  ) : (
                    <Avatar className={classes.avatar}>
                      {description.charAt(0).toUpperCase()}
                    </Avatar>
                  )}
                </Tooltip>
              ))}
            </div>
          ) : (
            <Typography>No se seleccionó ninguna a actividad</Typography>
          )}
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(NeighbourhoodResume)
