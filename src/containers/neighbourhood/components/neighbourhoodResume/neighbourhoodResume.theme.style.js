const styles = theme => ({
  tyTitle: {
    fontWeight: 'bold',
    color: theme.palette.common.hint
  },
  divWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  gridContainer: {
    flexDirection: 'column'
  },
  gridItem: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto'
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
