import React, { Component } from 'react'
import { Button, Grid, withWidth, withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import themeStyles from './addImgButton.theme.styles'
import { compose } from 'recompose'

class AddImageButton extends Component {
  state = {
    selectedPictureBase64: '',
    selectedPicture: null,
    returnImageBase64: this.props.returnImageBase64
  }

  fileSelectedHandler = event => {
    const image = URL.createObjectURL(event.target.files[0])
    var reader = new FileReader()
    let image64 = ''

    reader.readAsDataURL(event.target.files[0])
    reader.onloadend = () => {
      image64 = reader.result

      this.setState({
        selectedPicture: image,
        selectedPictureBase64: image64
      })

      this.state.returnImageBase64(
        this.state.selectedPicture,
        this.state.selectedPictureBase64.replace(/^data:image\/[a-z]+;base64,/, '')
      )
    }
  }

  deleteSelectedImg = () => {
    this.setState({ selectedPicture: null, selectedPictureBase64: '' })
    this.state.returnImageBase64(null, '')
  }
  render() {
    const { classes } = this.props
    return (
      <Grid container style={{ textAlign: 'center' }}>
        {this.state.selectedPicture === null ? (
          <Button className={classes.buttonAddImg} component="label">
            <AddIcon className={classes.addIcon} />
            <input type="file" onChange={this.fileSelectedHandler} className={classes.inputImg} />
          </Button>
        ) : (
          <div className={classes.divWrapperImage}>
            <img
              src={this.state.selectedPicture}
              alt="foto de perfil"
              className={classes.imgSelected}
            />
            <Button onClick={this.deleteSelectedImg} className={classes.buttonDeleteImageSelected}>
              Eliminar
            </Button>
          </div>
        )}
      </Grid>
    )
  }
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(AddImageButton)
