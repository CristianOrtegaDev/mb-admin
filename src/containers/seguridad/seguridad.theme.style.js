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

  // Fab button icon

  gridContainer: {
    width: '100%'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.palette.common.blue
    }
  },
  cssFocused: {},

  gridItem: {
    maxWidth: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexWrap: 'wrap',
    marginTop: '24px'
  },

  gridContainerMain: {
    justifyContent: 'center'
  },
  gridItemMainTitle: {
    width: '70%',
    maxWidth: '1000px',
    marginTop: '24px'
  },
  tyMain: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#ADADAD'
  },
  gridItemButton: {
    width: '70%',
    maxWidth: '1000px',
    marginTop: '8px'
  },
  paperButton: {
    borderRadius: '10px',
    boxShadow: 'none',
    padding: '24px',
    display: 'flex',
    alignItems: 'center'
  },
  tyButton: {
    marginLeft: '16px'
  },

  paper: {
    borderRadius: '10px',
    boxShadow: 'none',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  gridItemList: {
    maxHeight: '400px'
  },
  list: {
    height: '400px',
    flexShrink: 0,
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    overflowY: 'auto',
    flexDirection: 'column',
    border: '1px solid lightgrey',
    borderRadius: '5px'
    //boxShadow: '0 2px 1px -1px rgba(0,0,0,.2),
    //0 1px 1px 0 rgba(0,0,0,.14),
    // 0 1px 10px 0 rgba(0,0,0,.12)'
  },

  listWrapper: {
    overflowY: 'auto',
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column'
  },
  avatarList: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50px',
    height: '50px',
    background: theme.palette.common.blue
  },
  tyName: {
    fontWeight: 'bold'
  },
  tyData: {
    color: '#ADADAD'
  },

  gridItemSearchPaper: {
    borderRadius: '10px',
    display: 'flex',
    boxShadow: 'none',
    flexWrap: 'wrap',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tySearch: {
    padding: '24px 24px 0px 24px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ADADAD'
  },
  gridContainerSearchers: {
    flexDirection: 'row',
    padding: ' 0px 38px 24px 24px',
    justifyContent: 'space-around'
  },
  searchContainer: {
    marginTop: theme.spacing.unit * 3,
    paddingTop: 0,
    margin: '5px'
  },
  portalSearchField: {
    fontSize: '16px',
    color: theme.palette.common.darkgrey
  },
  borderTextfield: {
    borderRadius: '10px'
  },
  gridItemSpinner: {
    margin: 'auto',
    marginTop: '200px'
  },
  listItem: {
    paddingLeft: '0px'
  },
  iconSearch: {
    color: theme.palette.common.blue
  },
  button: {
    height: '50px',
    width: '200px',
    background: theme.palette.common.blue,
    borderRadius: '10px',
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {}
  }
})

export default styles
