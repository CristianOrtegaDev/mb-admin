const styles = theme => ({
  gridContainerMain: {
    flexDirection: 'column'
  },
  gridItemTitle: {
    width: '70%',
    maxWidth: '1000px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing.unit * 3
  },
  viewTitle: {
    fontSize: '25px',
    color: theme.palette.common.hint,
    fontWeight: 'bold'
  },
  gridItemButtons: {
    width: '70%',
    maxWidth: '1000px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing.unit
  },
  gridItemButtonsPaper: {
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    boxShadow: 'none',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 3
  },
  paperButton: {
    height: '50px',
    width: '200px',
    background: theme.palette.common.blue,
    borderRadius: '10px',
    color: theme.palette.primary.main,
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing.unit * 2
    }
  },
  gridItemSearch: {
    width: '70%',
    maxWidth: '1000px',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing.unit * 3
  },
  gridItemSearchPaper: {
    borderRadius: '10px',
    display: 'flex',
    boxShadow: 'none',
    flexWrap: 'wrap'
  },
  tySearch: {
    padding: '24px 24px 0px 24px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme.palette.common.hint
  },
  searchContainer: {
    marginTop: theme.spacing.unit * 3,
    paddingTop: 0
  },
  portalSearchField: {
    fontSize: '16px',
    color: theme.palette.common.darkgrey
  },
  borderTextfield: {
    borderRadius: '10px'
  },
  iconSearch: {
    color: theme.palette.common.blue
  },
  gridItemSpinner: {
    margin: 'auto'
  },
  gridItemItemList: {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing.unit * 3
  },
  listItem: {
    padding: '10px  24px',
    marginBottom: theme.spacing.unit,
    boxShadow: 'none',
    background: theme.palette.primary.main
  },
  avatar: {
    height: '50px',
    width: '50px',
    background: theme.palette.common.blue,
    margin: 'auto'
  },
  gridItemName: {
    display: 'flex'
  },
  tyName: {
    fontSize: '20px',
    fontWeight: 'bold',
    paddingLeft: theme.spacing.unit * 2
  },
  tyLot: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: theme.spacing.unit,
    color: theme.palette.common.hint,
    fontSize: '16px'
  },
  tyDni: {
    fontSize: '16px',
    color: theme.palette.common.darkgrey,
    paddingLeft: theme.spacing.unit * 2
  },
  buttonDelete: {
    background: 'none',
    boxShadow: 'none'
  },
  iconDelete: {
    color: theme.palette.common.blue,
    fontSize: '30px'
  },
  divWrapperSpinner: {
    marginLeft: '45%',
    marginTop: '15%'
  },
  input: {
    display: 'none'
  },
  styledTable: {
    minHeight: '560px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  styledFooter: {
    display: 'flex',
    justifyContent: 'center'
  },
  styledRow: {
    width: '100%',
    display: 'block',
    height: 'auto'
  },
  rowWrapper: {
    width: '100%',
    display: 'block',
    height: 'auto'
  }
})

export default styles
