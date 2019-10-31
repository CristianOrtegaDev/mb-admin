const styles = theme => ({
  menuProps: {
    maxHeight: '250px',
    width: '250px'
  },
  select: {
    width: '230px',
    textAlign: 'left'
  },
  gridContainer: {
    marginTop: theme.spacing.unit * 2
  },
  emHint: {
    fontStyle: 'unset',
    color: theme.palette.common.hint
  },
  gridItemForm: {
    marginLeft: 'auto',
    textAlign: 'center'
  },
  gridItemAvatars: {
    marginRight: 'auto'
  },
  divWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  avatar: {
    height: '30px',
    width: '20px',
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    background: theme.palette.common.blue,
    padding: '5px 10px'
  }
})
export default styles
