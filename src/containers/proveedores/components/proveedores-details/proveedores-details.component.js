import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import compose from 'recompose/compose'
import themeStyles from './proveedores-details.theme.style'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import { Avatar, Divider } from '@material-ui/core'
import Moment from 'react-moment'
import { dayOfTheWeek } from 'components/dayToLetter/dayToLetter'

class ProveedorDetalle extends Component {
  render() {
    const { classes, data } = this.props

    return (
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={3} className={classes.gridItemContainerAvatar}>
          {data.service.category.avatar_url ? (
            <Avatar className={classes.avatar} src={data.service.category.avatar_url} />
          ) : (
            <Avatar className={classes.avatar}>
              {data.service.category.description.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Typography className={classes.tyTitle}>{data.service.category.description}</Typography>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={6} md={9} className={classes.gridItemContainerData}>
          <Grid item className={classes.gridItemContainerTitle}>
            <Typography className={classes.tyTitleProprietary}>Propietario</Typography>
            <Typography className={classes.tyTitleSupplier}>Proveedor</Typography>
          </Grid>
          <Grid item className={classes.gridItemContainerDisplayedData}>
            <Grid item className={classes.gridItemContainerDisplayedDataLeft}>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Nombre:</Typography>
                <Typography>{data.user_owner.name}</Typography>
              </div>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>DNI: </Typography>
                <Typography>{data.user_owner.dni}</Typography>
              </div>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Email:</Typography>
                <Typography>{data.user_owner.email}</Typography>
              </div>
              {data.user_owner.telephone ? (
                <div className={classes.divWrapper}>
                  <Typography className={classes.tyHint}>Teléfono:</Typography>
                  <Typography>{data.user_owner.telephone}</Typography>
                </div>
              ) : (
                <div className={classes.divWrapper}>
                  <Typography className={classes.tyHint}>Teléfono:</Typography>
                  <Typography>No disponible</Typography>
                </div>
              )}

              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Barrio:</Typography>
                <Typography>{data.neighbourhood.name}</Typography>
              </div>
            </Grid>
            <Divider />
            <Grid item className={classes.griditemContainerDataRight}>
              <Grid item className={classes.gridItemContainerTitle}>
                <Typography className={classes.tyTitleSupplierDown}>Proveedor</Typography>
              </Grid>
              {data.supplier ? (
                <div>
                  <div className={classes.divWrapper}>
                    <Typography className={classes.tyHint}>Nombre:</Typography>
                    <Typography>{data.supplier.name}</Typography>
                  </div>
                  <div className={classes.divWrapper}>
                    <Typography className={classes.tyHint}>DNI:</Typography>
                    <Typography>{data.supplier.dni}</Typography>
                  </div>
                  <div className={classes.divWrapper}>
                    <Typography className={classes.tyHint}>Email:</Typography>
                    <Typography>{data.supplier.email}</Typography>
                  </div>
                  <div className={classes.divWrapper}>
                    <Typography className={classes.tyHint}>Teléfono:</Typography>
                    <Typography>{data.supplier.telephone}</Typography>
                  </div>
                </div>
              ) : (
                <div className={classes.divWrapper}>
                  <Typography>Proveedor a confirmar</Typography>
                </div>
              )}
            </Grid>
          </Grid>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={6} md={9} className={classes.gridItemContainerData}>
          <Grid item className={classes.gridItemContainerTitle}>
            <Typography className={classes.tyService}>Servicio</Typography>
          </Grid>
          <Grid item className={classes.gridItemContainerDisplayedData}>
            <Grid item className={classes.gridItemContainerDisplayedDataLeft}>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Nombre:</Typography>
                <Typography>{data.service.description}</Typography>
              </div>

              {data.service.detail ? (
                <div className={classes.divWrapper}>
                  <Typography className={classes.tyHint}>Detalle:</Typography>
                  <Typography>{data.service.detail}</Typography>
                </div>
              ) : (
                <div className={classes.divWrapper}>
                  <Typography className={classes.tyHint}>Detalle:</Typography>
                  <Typography>No disponible</Typography>
                </div>
              )}

              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Urgencia:</Typography>
                <Typography>{data.is_urgent ? 'Si' : 'No'}</Typography>
              </div>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Precio mínimo:</Typography>
                <Typography>{data.service.minimum_price}</Typography>
              </div>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Extra por urgencia</Typography>
                <Typography>{data.service.urgency_additional_price}</Typography>
              </div>
            </Grid>
            <Grid item className={classes.griditemContainerDataRight}>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Fecha:</Typography>
                <Typography>
                  <Moment format="DD/MM/YYYY">{data.date}</Moment>
                </Typography>
              </div>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Día:</Typography>
                <Typography>{dayOfTheWeek(data.schedule.day_of_week)}</Typography>
              </div>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Desde:</Typography>
                <Typography>
                  <Moment format="hh:mm">{data.schedule.time_from}</Moment>hs
                </Typography>
              </div>
              <div className={classes.divWrapper}>
                <Typography className={classes.tyHint}>Hasta:</Typography>
                <Typography>
                  <Moment format="hh:mm">{data.schedule.time_to}</Moment>hs
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(ProveedorDetalle)
