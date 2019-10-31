const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  listitem: {
    marginBottom: '5px'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  background: {
    background: theme.palette.secondary.main,
    overflow: 'hidden',
    color: theme.palette.text.primary,
    marginBottom: '20px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  tabLabel: {
    maxWidth: '100%',
    textTransform: 'capitalize',
    color: 'black'
  },
  toggleContainer: {
    flexDirection: 'row',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center'
  },
  test: {
    transform: 'translate(0,16px) scale(1)'
  },
  divContainerHeadLine: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    margin: '20px 0'
  },
  tyTitle: {
    fontSize: '25px',
    fontWeight: 'bold'
  },
  divContainerHeadLineButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  divContainerIconSearch: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: '20px'
  },
  iconSearch: {
    fontSize: '35px',
    color: theme.palette.common.darkgrey
  },
  buttonHeadLine: {
    background: theme.palette.common.blue,
    borderRadius: '10px',
    height: '50px',
    width: '200px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  divContainerNav: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex'
  },
  labelTab: {
    display: 'block',
    color: 'black',
    padding: '15px 0',
    fontSize: '16px'
  },
  /*ajusta el tamaño de las tab*/
  tabRoot: {
    minWidth: '10px'
  },
  /*modifica el color de la tab seleccionada */
  colorTab: {
    backgroundColor: theme.palette.common.blue
  },
  formContainerSelects: {
    textAlign: 'right',
    marginTop: '0px'
  },
  formControlMsjType: {
    width: '35%'
  },
  formControlLot: {
    width: '15%',
    marginLeft: '2%'
  },
  formControlRead: {
    width: '20%',
    marginLeft: '2%'
  },
  divWrapperSpinner: {
    marginLeft: '45%',
    marginTop: '15%'
  }
})

export default styles
