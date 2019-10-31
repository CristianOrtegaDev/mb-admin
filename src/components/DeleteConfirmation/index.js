import React from 'react'
import {
  SectionTitle,
  Row,
  StyledButton,
  Wrapper,
  CrossImage,
  CrossWrapper,
  SectionError,
  ErrorWrapper
} from './styled'
import Modal from 'components/Modal'
import CrossIcon from 'assets/icons/cross.png'
import CircularProgress from '@material-ui/core/CircularProgress'

const DeleteConfirmation = ({ title, onBtnClick, btnContent, onBtnClose, onLoading, onError }) => (
  <Modal>
    <Wrapper>
      <CrossWrapper>
        <CrossImage onClick={onBtnClose} src={CrossIcon} />
      </CrossWrapper>
      <Row>
        <SectionTitle>{title}</SectionTitle>

        <ErrorWrapper>
          {onError && <SectionError>Hubo un problema</SectionError>}
          {btnContent && (
            <StyledButton onClick={onBtnClick}>
              {onLoading ? <CircularProgress size={18} /> : btnContent}
            </StyledButton>
          )}
        </ErrorWrapper>
      </Row>
    </Wrapper>
  </Modal>
)

export default DeleteConfirmation
