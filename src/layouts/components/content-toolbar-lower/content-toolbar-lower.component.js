import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index.actions'

// Material components
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import { NavLink } from 'react-router-dom/'

import styles from './content-toolbar-lower.style'
import { menuItems } from '../../../config'
import logoImage from '../../../assets/images/logo.png'

class ContentToolbarLower extends React.Component {
  state = {
    anchor: null,
    open: null,
    profileMenuEl: null,
    profileMenuOpen: false,
    layoutMenuEl: null,
    layoutMenuOpen: false
  }

  handleOpenProfileClick = event => {
    this.setState({
      profileMenuEl: event.currentTarget,
      layoutProfileMenuOpen: true
    })
  }

  handleSelectProfileClick = () => {
    this.setState({ profileMenuEl: null, layoutProfileMenuOpen: false })
  }

  handleCloseProfileClick = () => {
    this.setState({ profileMenuEl: null, layoutProfileMenuOpen: false })
  }

  handleOpenLayoutClick = event => {
    this.setState({ layoutMenuEl: event.currentTarget, layoutMenuOpen: true })
  }

  handleSelectLayoutClick = () => {
    this.setState({ layoutMenuEl: null, layoutMenuOpen: false })
  }

  handleCloseLayoutClick = () => {
    this.setState({ layoutMenuEl: null, layoutMenuOpen: false })
  }

  handleLogoutClick = () => {
    this.props.onLogout()
  }

  handleClick = title => event => {
    this.setState({ anchor: event.currentTarget, open: title })
  }

  handleClose = () => {
    this.setState({ anchor: null, open: null })
  }

  render() {
    const { classes } = this.props
    const { anchor, open } = this.state

    return (
      <Toolbar classes={{ root: classes.toolbarClass }}>
        <img src={logoImage} className={classes.appLogo} alt="logo" />
        {menuItems.map(item =>
          item.href ? (
            <Button
              className={classes.menuItem}
              key={item.title}
              exact
              activeClassName={classes.activeMenuItem}
              component={NavLink}
              to={item.href}
            >
              {item.title}
            </Button>
          ) : (
            item.children && (
              <div key={item.title}>
                <Button
                  aria-owns={anchor && open === item.title ? item.title : null}
                  aria-haspopup="true"
                  onClick={this.handleClick(item.title)}
                  classes={{
                    root: classes.menuItem
                  }}
                >
                  {item.title}
                </Button>
                <Menu
                  id={item.title}
                  anchorEl={anchor}
                  open={Boolean(open === item.title)}
                  onClose={this.handleClose}
                >
                  {item.children.map(child =>
                    child.type === 'header' ? (
                      <ListSubheader
                        key={child.title}
                        disableSticky
                        className={classes.headerMenuItem}
                      >
                        {child.title}
                      </ListSubheader>
                    ) : (
                      <MenuItem
                        exact
                        className={classes.childrenMenuItem}
                        activeClassName={classes.activeMenuItem}
                        component={NavLink}
                        to={child.href}
                        key={child.title}
                        onClick={this.handleClose}
                      >
                        {child.title}
                      </MenuItem>
                    )
                  )}
                </Menu>
              </div>
            )
          )
        )}
        <span className="portal-flex" />
        <IconButton
          className={classes.profileIcon}
          aria-label="acount information"
          onClick={this.handleOpenLayoutClick}
        >
          <AccountCircleIcon className={classes.profileIcon} />
        </IconButton>
        <Menu
          id="layout-menu"
          anchorEl={this.state.layoutMenuEl}
          open={this.state.layoutMenuOpen}
          onClose={this.handleCloseLayoutClick}
        >
          <MenuItem
            className={classes.menuItemButton}
            exact
            component={NavLink}
            to="/nuevo_barrio"
            key="nuevo_barrio-menu"
            onClick={this.handleCloseLayoutClick}
          >
            Barrio
          </MenuItem>
          {/*  <MenuItem
            exact
            component={NavLink}
            to="/perfil"
            key="profile-menu"
            onClick={this.handleCloseLayoutClick}
          >
            Perfil
          </MenuItem> */}
          <MenuItem
            className={classes.menuItemButton}
            exact
            component={NavLink}
            to="/login"
            key="logout-menu"
            onClick={this.handleLogoutClick}
          >
            Salir
          </MenuItem>
        </Menu>
      </Toolbar>
    )
  }
}

ContentToolbarLower.propTypes = {
  classes: PropTypes.shape({}).isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(ContentToolbarLower)
)
