import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import withWidth from '@material-ui/core/withWidth'
import themeStyles from './proveedores-list.theme.style'
import { Grid, Typography, Avatar } from '@material-ui/core'
import Moment from 'react-moment'

class ProveedoresList extends React.Component {
  render() {
    const { classes, onSelect, list } = this.props
    return (
      <div className={classNames(classes.list, 'portal-hide-scrollbars')}>
        <List component="nav" className={classes.listWrapper}>
          {list.map(reservation => (
            <ListItem
              className={classes.listItem}
              title={reservation.user_owner.name}
              key={reservation.user_owner.telephone}
              onClick={onSelect(reservation)}
              divider
              button
            >
              <Grid item xs={3}>
                {reservation.service.category.avatar_url ? (
                  <Avatar
                    className={classes.avatar}
                    src={reservation.service.category.avatar_url}
                  />
                ) : (
                  <Avatar className={classes.avatar}>
                    {reservation.service.category.description.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </Grid>
              <Grid item xs={9} className={classes.gridItem}>
                <Grid item className={classes.gridItemContainer}>
                  {reservation.supplier ? (
                    <Typography className={classes.tyName}>
                      Proveedor: {reservation.supplier.name}
                    </Typography>
                  ) : (
                    <Typography className={classes.tyName}>Proveedor: Pendiente</Typography>
                  )}
                  <Typography className={classes.tySubtitle}>
                    Servicio para: {reservation.user_owner.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    Fecha: <Moment format="DD/MM/YYYY">{reservation.date}</Moment>
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

ProveedoresList.defaultProps = {
  selectedNovedad: null
}

ProveedoresList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  selectedNovedad: PropTypes.shape({}),
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(ProveedoresList)
