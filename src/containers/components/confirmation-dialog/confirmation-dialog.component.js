import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import themeStyles from './confirmation-dialog.theme.style'
import compose from 'recompose/compose'

class ConfirmationDialog extends React.Component {
  handleCancel = () => {
    this.props.onClose(null)
  }

  handleConfirmation = () => {
    this.props.onClose(this.props.message)
  }

  render() {
    const { classes } = this.props

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleCancel}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
      >
        <DialogTitle id="confirm-delete-dialog-title" className={classes.dialogTitle}>
          {this.props.title ? this.props.title : 'Desactivar Entidad'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="confirm-delete-dialog-description"
            className={classes.dialogContentText}
          >
            {this.props.description
              ? this.props.description
              : 'Esta seguro que desea desactivar la entidad?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={this.handleConfirmation} className={classes.button} autoFocus>
            {this.props.okButtonLabel ? this.props.okButtonLabel : 'Desactivar'}
          </Button>
          <Button onClick={this.handleCancel} className={classes.button}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ConfirmationDialog.defaultProps = {
  message: null
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(ConfirmationDialog)
