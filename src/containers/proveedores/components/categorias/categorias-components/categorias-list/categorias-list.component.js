import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import withWidth from '@material-ui/core/withWidth'
import themeStyles from './categorias-list.theme.style'

import { Grid, Typography, Avatar } from '@material-ui/core'

class ProveedoresList extends React.Component {
  render() {
    const { classes, onSelect } = this.props

    return (
      <div className={classNames(classes.list, 'portal-hide-scrollbars')}>
        <List component="nav" className={classes.listWrapper}>
          {this.props.list.map(categoria => (
            <ListItem
              className={classes.listItem}
              title={categoria.id}
              key={categoria.id}
              onClick={onSelect(categoria)}
              divider
              button
            >
              <Grid item xs={3}>
                {!categoria.avatar_url ? (
                  <Avatar className={classes.avatar}>
                    {categoria.description.charAt(0).toUpperCase()}
                  </Avatar>
                ) : (
                  <Avatar className={classes.avatar} src={categoria.avatar_url} />
                )}
              </Grid>
              <Grid item xs={9} className={classes.gridItem}>
                <Grid item className={classes.gridItemContainer}>
                  <Typography className={classes.tyName}>{categoria.description}</Typography>
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
