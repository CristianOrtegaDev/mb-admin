import React from 'react'
import FileInput from 'components/FileInput'
import { Container, InputLabel, Row, InputWrapper, ErrorLabel } from './styled'

class FileInputGroup extends React.Component {
  state = {
    images: {}
  }

  componentDidMount = () => this.generateInitialState()

  generateInitialState = () => {
    const images = Array(this.props.imagesAmount)
      .fill()
      .reduce((accum, actual, i) => {
        accum[`img${i}`] = undefined
        return accum
      }, {})
    this.setState({ images })
  }

  setFieldValue = (key, file) => {
    let images = this.state.images
    images[key] = file

    this.props.onChange(this.getOnChangeValues(images))

    this.setState({
      images
    })
  }

  getOnChangeValues = images => Object.values(images).filter(e => e)

  render() {
    return (
      <Container>
        <InputLabel>{this.props.label}</InputLabel>
        <Row justify={'flex-start'} align={'flex-end'}>
          {Object.keys(this.state.images).map((imageKey, i) => (
            <InputWrapper key={i} width={15}>
              <FileInput onChange={file => this.setFieldValue(imageKey, file)} />
            </InputWrapper>
          ))}
        </Row>
        {this.props.error && <ErrorLabel>{this.props.error}</ErrorLabel>}
      </Container>
    )
  }
}

export default FileInputGroup
