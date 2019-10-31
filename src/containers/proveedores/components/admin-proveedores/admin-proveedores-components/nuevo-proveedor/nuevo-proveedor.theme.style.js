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
    marginRight: 'auto',
    minHeight: '500px'
  },
  gridContainerMain: {
    flexDirection: 'column'
  },
  inputImg: {
    display: 'none'
  },
  gridContainerWrappForms: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2
  },
  gridContainerForm: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  gridItemWrappTextFields: {
    textAlign: 'center'
  },
  textField: {
    width: '80%'
  },

  gridItemButton: {
    textAlign: 'end',
    marginTop: 'auto'
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
    marginRight: theme.spacing.unit * 4
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
  formControl: {
    width: '80%',
    textAlign: 'start'
  },
  datePicker: {
    height: '30px',
    borderStyle: 'none',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.common.hint,
    borderBottomWidth: '1px',
    fontSize: '16px'
  },
  buttonFabRemove: {
    background: 'transparent',
    boxShadow: 'none'
  },
  iconDelete: {
    color: theme.palette.common.hint,
    fontSize: '35px'
  },
  buttonFabAdd: {
    background: theme.palette.common.blue,
    boxShadow: 'none'
  },
  iconAdd: {
    color: theme.palette.common.white,
    fontSize: '30px'
  },
  gridItemDay: {
    marginBottom: '8px'
  },
  txfDay: {
    width: '100%'
  },
  gridItemHours: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  gridItemDelete: {
    textAlign: 'center',
    marginTop: 'auto'
  },
  tyHint: {
    fontSize: '20px',
    color: theme.palette.common.hint
  },
  gridContainerDynamicForm: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  gridItemWrappCategory: {
    flexDirection: 'row',
    display: 'flex',
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    borderBottomStyle: 'groove',
    borderBottomWidth: '1px'
  },
  gridItemContainer: {
    flexDirection: 'column'
  },
  gridContainerTimes: {
    flexDirection: 'row'
  },
  gridItemFlex: {
    display: 'flex'
  },
  divider: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  gridItemWrappAdd: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  gridItemWrappRemove: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  tyError: {
    color: theme.palette.common.error,
    marginRight: theme.spacing.unit * 4,
    width: '200px',
    marginLeft: 'auto ',
    textAlign: 'center'
  },
  tyHintPhone: {
    color: theme.palette.common.hint,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'start'
  }
})
export default style
