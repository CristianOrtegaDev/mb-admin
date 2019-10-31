const styles = theme => ({
  gridContainer: {
    padding: theme.spacing.unit * 2,
    alignItems: 'center',
    flexDirection: 'column'
  },
  avatar: {
    width: '100px',
    height: '100px',
    marginBottom: theme.spacing.unit * 2,
    background: theme.palette.common.blue
  },
  divWrapperSpace: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2
  },
  divWrapper: {
    display: 'flex'
  },
  tyHint: {
    fontWeight: 'bold',
    color: theme.palette.common.hint
  },
  tyHintBlack: {
    fontWeight: 'bold',
    marginRight: theme.spacing.unit
  },
  gridContainerHours: {
    flexDirection: 'column'
  },
  tyTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
    textDecoration: 'underline'
  },
  tySubtitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    textDecoration: 'underline'
  },
  tyCategory: {
    fontSize: '18px'
  },
  tableCell: {
    [theme.breakpoints.down('md')]: {
      padding: '0px'
    }
  }
})

export default styles
