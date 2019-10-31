const styles = theme => ({
  gridContainerHeader: {
    flexDirection: 'column'
  },
  gridItemHeaderTitle: {
    width: '70%',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit
  },
  tyHeaderTitle: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: theme.palette.common.hint
  },
  cardContainerActions: {
    boxShadow: 'none',
    flexDirection: 'row',
    borderRadius: '10px',
    backgroundColor: theme.palette.primary.main,
    width: '70%',
    maxWidth: '1000px',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  cardActions: {
    padding: theme.spacing.unit * 3
  },
  button: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.common.blue,

    height: '50px',
    width: '200px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '10px',
    textTransform: 'none'
  }
})

export default styles
