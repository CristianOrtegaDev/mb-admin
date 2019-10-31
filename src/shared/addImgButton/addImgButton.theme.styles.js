const style = theme => ({
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
    borderRadius: '10px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonDeleteImageSelected: {
    width: '100px',
    borderRadius: '10px',
    background: 'red',
    color: theme.palette.primary.main,
    marginLeft: 'auto',
    marginRight: 'auto',
    textTransform: 'none',
    marginTop: theme.spacing.unit
  },
  inputImg: {
    display: 'none'
  }
})
export default style
