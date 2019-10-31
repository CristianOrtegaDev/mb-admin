const styles = theme => ({
  confirmationDialogWrapper: {
    borderRadius: '10px'
  },
  button: {
    height: '50px',
    background: theme.palette.common.blue,
    width: '200px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  dialogTitle: {
    fontSize: '20px',
    color: 'black',
    fontWeight: 'bold'
  },
  dialogContentText: {
    fontSize: '16px',
    color: 'black'
  },
  dialogActions: {
    justifyContent: 'center'
  }
})

export default styles
