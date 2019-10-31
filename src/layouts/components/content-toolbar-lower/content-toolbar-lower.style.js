const styles = theme => ({
  toolbarClass: {
    background: theme.palette.primary.main,
    flexWrap: 'wrap',
    placeContent: 'stretch flex-start',
    alignItems: 'stretch',
    flexLayout: 'row'
  },
  menuItem: {
    color: theme.palette.text.main,
    textTransform: 'none',
    minWidth: 140,
    borderRadius: '0px'
  },

  profileIcon: {
    color: theme.palette.common.blue
  },

  title: {
    color: theme.palette.common.blue,
    textTransform: 'none',
    minWidth: 140,
    paddingTop: '16px',
    paddingBottom: '16px'
  },

  headerMenuItem: {
    flexDirection: 'column',
    alignItems: 'start',
    display: 'flex',
    paddingBottom: 0,
    paddingTop: 0
  },

  childrenMenuItem: {
    color: theme.palette.primary.light,
    textTransform: 'none'
  },

  activeMenuItem: {
    borderBottom: `2px solid ${theme.palette.common.blue}`,
    color: theme.palette.common.blue
  },
  appLogo: {
    maxHeight: '64px',
    maxWidth: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    objectFit: 'contain'
  },
  menuItemButton: {
    color: 'black',
    fontWeight: 'bold'
  }
})

export default styles
