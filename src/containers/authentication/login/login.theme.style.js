import backgroundImage from '../../../assets/images/login-background.jpg'

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  accessTypeAction: {
    borderRadius: '10px',
    height: '50px',
    margin: theme.spacing.unit,
    minWidth: '300px',
    border: `1px solid ${theme.palette.common.blue}`,
    backgroundColor: theme.palette.common.while,
    color: theme.palette.common.blue,
    fontSize: '16px',
    fontWeight: 'bold',

    textTransform: 'none',
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.blue
    }
  },
  registrationPanel: {
    margin: theme.spacing.unit * 2,
    minWidth: 350,
    textTransform: 'none'
  },
  content: {
    flex: '1 0 auto'
  },
  cover: {
    width: '100%'
  },
  background: {
    background: theme.palette.primary.main,
    width: '100%',
    height: '100%'
  },
  header: {
    color: theme.palette.common.blue,
    fontSize: 45,
    width: 'fit-content',
    marginBottom: theme.spacing.unit
  },
  subheader: {
    width: 'fit-content',
    fontSize: 25
  },
  backgroundLeft: {
    background: theme.palette.primary.main,
    backgroundSize: 'cover',
    backgroundImage: `url(${backgroundImage})`,
    width: '100%',
    height: '100%'
  },
  loginAction: {
    backgroundColor: theme.palette.common.blue,
    margin: theme.spacing.unit * 2,
    color: theme.palette.primary.main,
    minWidth: 350,
    textTransform: 'none',
    '&:hover': {
      color: theme.palette.common.blue,
      border: `1px solid ${theme.palette.common.blue}`,
      backgroundColor: theme.palette.common.while
    }
  },
  registerAction: {
    color: theme.palette.common.blue,
    textTransform: 'none',
    minWidth: 350,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 10,
    '&:hover': {
      color: theme.palette.common.blue,
      border: `1px solid ${theme.palette.common.blue}`,
      backgroundColor: theme.palette.common.while
    }
  },
  appLogo: {
    maxHeight: '100px',
    maxWidth: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    objectFit: 'contain'
  },
  gridItemSpinner: {
    margin: 'auto'
  },
  tyError: {
    color: 'red',
    fontWeight: 'bold'
  }
})

export default styles
