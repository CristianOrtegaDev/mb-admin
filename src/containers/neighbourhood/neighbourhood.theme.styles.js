const styles = theme => ({
  tyTitle: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: theme.palette.common.hint
  },
  gridContainer: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'column'
  },
  gridItem: {
    marginTop: '24px',
    marginBottom: '8px'
  },
  paper: {
    boxShadow: 'none',
    borderRadius: '10px',
    minHeight: '400px',
    marginBottom: '16px'
  },
  stepper: {
    color: theme.palette.common.blue
  },

  gridContainerStepper: {
    minHeight: '400px',
    flexDirection: 'column',
    marginBottom: '16px'
  },
  gridItemStepper: {
    marginTop: theme.spacing.unit
  },
  gridContainerButtons: {
    marginTop: 'auto'
  },
  gridItemButtons: {
    marginLeft: 'auto',
    paddingRight: theme.spacing.unit * 2
  },
  buttonNext: {
    background: theme.palette.common.blue,
    borderRadius: '10px',
    color: theme.palette.common.white,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    width: '120px',
    height: '40px',
    marginLeft: theme.spacing.unit
  },
  buttonBack: {
    background: theme.palette.common.hint,
    borderRadius: '10px',
    color: theme.palette.common.white,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    height: '40px'
  },
  buttonSave: {
    background: theme.palette.common.blue,
    borderRadius: '10px',
    color: theme.palette.common.white,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    width: '120px',
    height: '40px',
    marginLeft: theme.spacing.unit
  },
  buttonReset: {
    background: theme.palette.common.error,
    borderRadius: '10px',
    color: theme.palette.common.white,
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    height: '40px'
  },
  tyError: {
    color: theme.palette.common.error,
    marginLeft: 'auto ',
    textAlign: 'center'
  }
})
export default styles
