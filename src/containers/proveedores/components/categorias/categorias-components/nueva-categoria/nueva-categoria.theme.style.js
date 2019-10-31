const style = theme => ({
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
  tyTitle: {
    width: '70%',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: theme.spacing.unit * 3,
    color: theme.palette.common.hint
  },
  paper: {
    borderRadius: '10px',
    boxShadow: 'none',
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  gridItemForm: {
    flexDirection: 'column',
    display: 'flex',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    minHeight: '500px'
  },

  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '80%'
  },
  gridItemButton: {
    textAlign: 'end'
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
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  buttonAddImg: {
    height: '150px',
    width: '150px',
    border: 'solid',
    borderColor: theme.palette.common.blue,
    borderRadius: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3
  },
  addIcon: {
    color: theme.palette.common.blue
  },
  divWrapperImage: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing.unit * 3
  },
  imgSelected: {
    height: '150px',
    width: '150px',
    borderRadius: '10px'
  },
  buttonDeleteImageSelected: {
    height: '20px',
    width: '100px',
    borderRadius: '10px',
    background: theme.palette.common.error,
    color: theme.palette.primary.main,
    marginLeft: 'auto',
    marginRight: 'auto',
    textTransform: 'none',
    marginTop: theme.spacing.unit
  },
  inputImg: {
    display: 'none'
  },
  tyError: {
    color: theme.palette.common.error,
    marginRight: theme.spacing.unit * 4,
    width: '200px',
    marginLeft: 'auto ',
    textAlign: 'center'
  }
})
export default style
