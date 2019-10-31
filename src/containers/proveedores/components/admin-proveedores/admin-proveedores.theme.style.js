const styles = theme => ({
  gridButtonBack: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%',
    maxWidth: '1000px',
    borderRadius: '10px'
  },

  ButtonBack: {
    padding: '0px',
    background: 'white',
    height: '40px',
    width: '40px',
    marginBottom: theme.spacing.unit * 2
  },
  ButtonPaperBack: {
    borderRadius: '10px',
    height: '30px',
    width: '30px'
  },
  IconBack: {
    marginTop: '2px',
    color: theme.palette.common.blue
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
    height: '500px',
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
