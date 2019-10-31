const styles = theme => ({
  list: {
    width: '50%',
    flexShrink: 0,
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    overflowY: 'auto',
    flexDirection: 'column',
    border: '1px solid lightgrey',
    borderRadius: '5px'
  },
  searchContainer: {
    padding: 16
  },
  listWrapper: {
    overflowY: 'auto',
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column'
  },
  usersListItemIconActive: {
    color: theme.palette.primary.main
  },
  usersListItemIcon: {
    marginRight: 0,
    height: '35px',
    width: '35px',
    color: theme.palette.common.blue
  },

  avatar: {
    height: '30px',
    width: '30px',
    padding: '10px',
    background: theme.palette.common.blue,
    margin: 'auto'
  },
  gridItemName: {
    display: 'flex'
  },

  tyLot: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: theme.spacing.unit,
    color: '#ADADAD',
    fontSize: '16px'
  },
  tyDni: {
    fontSize: '16px',
    color: theme.palette.common.darkgrey,
    paddingLeft: theme.spacing.unit * 2
  },
  listItem: {
    paddingLeft: '0px'
  },
  gridItem: {
    flexDirection: 'column'
  },
  gridItemContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  tyName: {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  tySubtitle: {
    fontSize: '16px',
    color: '#ADADAD'
  }
})

export default styles
