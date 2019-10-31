import React from 'react'
import NoFile from 'assets/icons/empty-document.png'
import CheckedImg from 'assets/icons/checked.png'
import inputTypes from 'constants/inputTypes'
import { readFile } from 'utils/fileManager'
import {
  AttachedContainer,
  CheckedElement,
  DocumentImg,
  FileInputWrapper,
  StyledFileInput
} from './styled'

class FileInput extends React.Component {
  state = {
    url: this.props.value
  }

  componentDidUpdate = prevProps => {
    if (this.props.value !== prevProps.value) this.setState({ url: this.props.value })
  }

  hasAttachedContent = () => this.state.url

  fileSelectedHandler = async event => {
    const attachFile = await readFile(event)
    if (this.props.onChange) this.props.onChange(attachFile)
    this.setState({ ...attachFile })
  }

  render() {
    return (
      <FileInputWrapper>
        {this.props.onChange && (
          <StyledFileInput type={inputTypes.FILE} onChange={this.fileSelectedHandler} />
        )}
        <AttachedContainer>
          {this.hasAttachedContent() && <CheckedElement src={CheckedImg} />}
          <DocumentImg src={this.hasAttachedContent() || NoFile} />
        </AttachedContainer>
      </FileInputWrapper>
    )
  }
}

export default FileInput
