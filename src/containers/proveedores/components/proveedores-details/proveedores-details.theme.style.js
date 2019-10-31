const styles = theme => ({
  gridContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 4
  },
  avatar: {
    width: '60px',
    height: '60px',
    fontSize: '30px',
    padding: '15px',
    marginBottom: theme.spacing.unit * 2,
    background: theme.palette.common.blue,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  divWrapper: {
    display: 'flex',
    marginBottom: theme.spacing.unit
  },
  tyTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: theme.spacing.unit * 2
  },
  tyHint: {
    fontWeight: 'bold',
    marginRight: theme.spacing.unit
  },

  gridItemContainerAvatar: {
    maxWidth: '100%',
    width: '100%',
    textAlign: 'center'
  },
  gridItemContainerData: {
    width: '100%',
    maxWidth: '90%'
  },
  gridItemContainerDisplayedData: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      display: 'table'
    }
  },

  gridItemContainerDisplayedDataLeft: {
    borderRightStyle: 'solid',
    borderWidth: '0.5px',
    borderColor: 'grey',
    width: '50%',
    [theme.breakpoints.down('lg')]: {
      borderRightStyle: 'none',
      width: '100%'
    }
  },
  tyTitleProprietary: {
    width: '50%',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  tyService: { fontSize: '20px', fontWeight: 'bold' },
  tyTitleSupplier: {
    width: '45%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '20px',
    fontWeight: 'bold',
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  tyTitleSupplierDown: {
    display: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    [theme.breakpoints.down('lg')]: {
      display: 'table'
    }
  },
  gridItemContainerTitle: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  griditemContainerDataRight: {
    width: '45%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('lg')]: {
      width: '50%',
      marginLeft: 'unset',
      marginRight: 'unset'
    }
  }
})

export default styles
