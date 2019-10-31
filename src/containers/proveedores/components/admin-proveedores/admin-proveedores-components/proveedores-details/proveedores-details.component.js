import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import compose from 'recompose/compose'
import themeStyles from './proveedores-details.theme.style'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import Moment from 'react-moment'
import { dayOfTheWeek } from 'components/dayToLetter/dayToLetter'

class ProveedorDetalle extends Component {
  state = {
    onOpenNewServicio: this.props.onOpenNewServicio
  }

  onOpenNewServicio = () => {
    this.state.onOpenNewServicio()
  }

  render() {
    const { classes, data } = this.props
    return (
      <Grid container className={classes.gridContainer}>
        <Grid item>
          {data.profile_picture ? (
            <Avatar className={classes.avatar} src={data.profile_picture} />
          ) : (
            <Avatar className={classes.avatar}>{data.name.charAt(0).toUpperCase()}</Avatar>
          )}
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Divider />
            <Typography className={classes.tyTitle}>Proveedor:</Typography>
            <div className={classes.divWrapper}>
              <Typography className={classes.tyHintBlack}>Nombre:</Typography>
              <Typography>
                {data.name} {data.family_name}
              </Typography>
            </div>
            <div className={classes.divWrapper}>
              <Typography className={classes.tyHintBlack}>DNI:</Typography>
              <Typography>{data.dni}</Typography>
            </div>
            <div className={classes.divWrapper}>
              <Typography className={classes.tyHintBlack}>Email:</Typography>
              <Typography>{data.email}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.divWrapper}>
              <Typography className={classes.tyHintBlack}>Teléfono:</Typography>
              <Typography>{data.telephone}</Typography>
            </div>
          </Grid>
        </Grid>
        <Divider />
        <Grid container className={classes.gridContainerHours}>
          <Typography className={classes.tyTitle}>Categorias y Horarios:</Typography>
          {data.categories.map((item, itemIndex) => (
            <div key={itemIndex}>
              <div className={classes.divWrapper}>
                <Typography className={classes.tySubtitle}>Categoría:</Typography>

                <Typography className={classes.tyCategory}>{item.category.description}</Typography>
              </div>
              <div className={classes.divWrapper}>
                <Typography className={classes.tySubtitle}>Barrio:</Typography>
                <Typography className={classes.tyCategory}>{item.neighbourhood.name}</Typography>
              </div>
              {item.times.map(time => time) ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableCell}>Día</TableCell>
                      <TableCell className={classes.tableCell}>Desde</TableCell>
                      <TableCell className={classes.tableCell}>Hasta</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {item.times.map((time, timeIndex) => (
                      <TableRow key={timeIndex}>
                        <TableCell className={classes.tableCell}>
                          <Typography className={classes.tyHint}>
                            {dayOfTheWeek(time.day_of_week)}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography>
                            <Moment format="HH:mm">{time.time_from}</Moment>
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Typography>
                            <Moment format="HH:mm">{time.time_to}</Moment>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                'El proveedor no tiene Horarios'
              )}
            </div>
          ))}
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(ProveedorDetalle)
