const styles = theme => ({
  gridContainerMain: {
    padding: theme.spacing.unit * 2,
    alignItems: 'center',
    height: '100%'
  },
  gridContainer: {
    flexDirection: 'column'
  },
  gridItemAvatar: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  avatar: {
    width: '60px',
    height: '60px',
    padding: '15px',
    fontSize: '30px',
    marginBottom: theme.spacing.unit * 2,
    background: theme.palette.common.blue
  },
  gridItemTitle: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  divWrapperSpace: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2
  },
  divWrapperContainer: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  divWrapper: {
    display: 'flex'
  },
  divWrapperSpinner: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  tyNoServices: {
    textAlign: 'center'
  },
  tyHint: {
    fontWeight: 'bold',
    marginRight: theme.spacing.unit,
    fontSize: '20px'
  },
  tyHintSmall: {
    fontWeight: 'bold'
  },
  tyTitle: {
    fontSize: '20px'
  },
  gridItemButtons: {
    marginTop: '32px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    }
  },
  button: {
    borderRadius: '10px',
    background: theme.palette.common.blue,
    width: '200px',
    height: '50px',
    color: theme.palette.primary.main,
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing.unit * 2
    }
  }
})

export default styles
