import React, { Component } from 'react'
import Aux from '../div-helper/div-helper'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { Typography, Paper } from '@material-ui/core'
import scss from './withErrorHandler.module.scss'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      isErrorOpen: false
    }
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null })
        return req
      })
      this.resInterceptor = axios.interceptors.response.use(null, err => {
        this.setState({ error: err, isErrorOpen: true })
        return Promise.reject(err)
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }
    onCloseError = () => {
      this.setState({ isErrorOpen: false })
    }

    render() {
      return (
        <Aux>
          <Dialog
            open={this.state.isErrorOpen}
            onClose={this.onCloseError}
            PaperProps={{
              style: {
                borderRadius: '10px'
              }
            }}
          >
            <Paper className={scss['paper']}>
              <Typography className={scss['ty-error-title']}>Hubo un Error</Typography>
              <Typography className={scss['ty-error-error']}>
                {this.state.error ? this.state.error.message : null}
              </Typography>
              <div className={scss['div-wrapper-button']}>
                <Button onClick={this.onCloseError} className={scss['button']}>
                  Cerrar
                </Button>
              </div>
            </Paper>
          </Dialog>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
