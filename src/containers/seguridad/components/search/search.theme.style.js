const style = theme => ({
  gridContainerHeader: {
    flexDirection: 'column'
  },

  cardContainerActions: {
    boxShadow: 'none',
    flexDirection: 'row',
    borderRadius: '10px',
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  cardActions: {
    padding: theme.spacing.unit * 2
  },
  portalSearchField: {
    fontSize: '16px',
    color: theme.palette.common.darkgrey
  },
  borderTextfield: {
    borderRadius: '10px',
    marginRight: '14px'
  },
  iconSearch: {
    color: theme.palette.common.blue,
    marginRight: '14px'
  },
  tySearchTitle: {
    fontSize: '16px',
    color: theme.palette.common.hint
  },
  radioGroup: {
    flexDirection: 'row'
  },
  root: {
    color: theme.palette.common.blue,
    '&$checked': {
      color: theme.palette.common.blue
    }
  },
  checked: {}
})
export default style
