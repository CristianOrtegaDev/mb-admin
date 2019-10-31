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

class ProveedoresList extends React.Component {
  state = {
    proveedoresList: this.props.list
  }

  render() {
    const { classes, onSelect } = this.props

    return (
      <div className={classNames(classes.list, 'portal-hide-scrollbars')}>
        <List component="nav" className={classes.listWrapper}>
          {this.state.proveedoresList.map(proveedor => (
            <ListItem
              className={classes.listItem}
              key={proveedor.id}
              onClick={onSelect(proveedor)}
              divider
              button
            >
              <Grid item xs={3}>
                {proveedor.profile_picture ? (
                  <Avatar className={classes.avatar} src={proveedor.profile_picture} />
                ) : (
                  <Avatar className={classes.avatar}>{proveedor.name.charAt(0)}</Avatar>
                )}
              </Grid>
              <Grid item xs={9} className={classes.gridItem}>
                <Grid item className={classes.gridItemContainer}>
                  <Typography className={classes.tyName}>{proveedor.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography>Teléfono: {proveedor.telephone}</Typography>
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
