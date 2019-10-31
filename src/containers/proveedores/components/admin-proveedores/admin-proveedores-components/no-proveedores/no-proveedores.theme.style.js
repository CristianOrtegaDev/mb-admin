const styles = theme => ({
  'users-no-users': {
    '&:before': {
      background: theme.palette.secondary.main
    }
  },
  'users-no-users__icon': {
    background: theme.palette.secondary.main,
    'box-shadow': `0 0 1px ${theme.palette.secondary.main} inset`,
    '&:before, &:after': {
      border: '0 solid transparent'
    },
    '&:before': {
      'border-bottom-color': theme.palette.secondary.main,
      'border-left-color': 'transparent',
      'border-right-color': 'transparent'
    },
    '&:after': {
      'border-right-color': theme.palette.secondary.light,
      'border-left-color': theme.palette.secondary.main,
      'border-bottom-color': theme.palette.secondary.main
    }
  },
  tyLore: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ADADAD',
    textAlign: 'center'
  }
})

export default styles
