const style = theme => ({
  paper: {
    borderRadius: '10px',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  gridItemForm: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-evenly',
    minHeight: '500px',
    padding: '40px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  textfield: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  gridItemButton: {
    textAlign: 'end',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%'
  },
  button: {
    height: '50px',
    background: theme.palette.common.blue,
    width: '200px',
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '10px',
    marginBottom: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  buttonAddImg: {
    height: '150px',
    width: '150px',
    border: 'solid',
    borderColor: theme.palette.common.blue,
    borderRadius: '10px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  addIcon: {
    color: theme.palette.common.blue
  },
  divWrapperImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  imgSelected: {
    height: '150px',
    width: '150px',
    borderRadius: '10px'
  },
  buttonDeleteImageSelected: {
    width: '100px',
    borderRadius: '10px',
    background: theme.palette.common.error,
    color: theme.palette.primary.main,
    marginLeft: 'auto',
    marginRight: 'auto',
    textTransform: 'none',
    marginTop: theme.spacing.unit
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%'
  },
  formControl: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    textAlign: 'start'
  },

  tyError: {
    color: theme.palette.common.error,
    width: '200px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: theme.spacing.unit * 4
  },
  tyHintPhone: {
    color: theme.palette.common.hint,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})
export default style
