const styles = theme => ({
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
    display: 'inherit',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    zIndex: '1'
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    maxWidth: '1000px',
    height: '600px',
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
