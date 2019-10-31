const menuWidth = 256

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  content: {
    width: '100%',
    padding: 0,
    flexGrow: 1,
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: '100%',
    overflowY: 'auto',
    boxSizing: 'border-box'
  },
  'content-left': {
    [theme.breakpoints.up('md')]: {
      marginLeft: -menuWidth
    }
  },
  'content-right': {
    [theme.breakpoints.up('md')]: {
      marginRight: -menuWidth
    }
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  'contentShift-left': {
    marginLeft: 0
  },
  'contentShift-right': {
    marginRight: 0
  },
  'users-list__item__avatar': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.blue,
    height: '50px',
    width: '50px'
  },
  'flex-container': {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    margin: '20px',
    borderRadius: '10px',
    backgroundColor: theme.palette.primary.main
  },
  novedadesWrapper: {
    display: 'inherit',
    flexDirection: 'column',
    height: '100%'
  },
  novedadesheader: {
    paddingLeft: '3px',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  userDetailHeader: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tyTitle: {
    color: '#ADADAD',
    fontSize: '25px',
    fontWeight: 'bold'
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    height: '700px',
    borderRadius: '10px',
    boxShadow: 'none',
    marginBottom: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.primary.main
  },
  userDetails: {
    height: '100%',
    width: '100%',
    overflow: 'auto'
  }
})

export default styles
