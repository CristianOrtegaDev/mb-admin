const style = theme => ({
  gridButtonBack: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%',
    borderRadius: '10px',
    maxWidth: '1000px'
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
    justifyContent: 'space-evenly',
    minHeight: '500px',
    padding: '40px'
  },
  textfield: {
    marginLeft: 'auto',
    marginRight: 'auto'
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
    marginBottom: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  textField: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  gridItemPrices: {
    display: 'flex',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between'
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
