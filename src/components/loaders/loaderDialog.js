import React, { Component } from 'react'
import { Dialog, withWidth, withStyles } from '@material-ui/core'
import Spinner from 'react-spinner-material'
import { compose } from 'recompose'

class LoaderDialog extends Component {
  state = {}

  render() {
    return (
      <Dialog
        PaperProps={{
          style: {
            background: 'transparent',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 'none'
          }
        }}
        open
      >
        <Spinner />
      </Dialog>
    )
  }
}

export default compose(
  withWidth(),
  withStyles({ withTheme: true })
)(LoaderDialog)
