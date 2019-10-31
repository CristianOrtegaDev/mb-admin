import React from 'react'
import Modal from 'components/Modal'
import CheckedImg from 'assets/icons/checked.png'
import CancelImg from 'assets/icons/cancel.png'
import ButtonMaterial from 'components/ButtonMaterial'
import theme from 'config/theme'
import { ModalContainer, ModalWrapper, Confirm, Title, SubTitle, ButtonWrapper } from './styled'

const ResponseModal = ({ onClick, children, title, subTitle, btnContent, error }) => (
  <Modal extended>
    <ModalContainer>
      <ModalWrapper error={error}>
        <Confirm src={error ? CancelImg : CheckedImg} />
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        {children}
        <ButtonWrapper>
          <ButtonMaterial
            background={theme.colors.white}
            color={error ? theme.colors.red : theme.colors.blueRibbon}
            borderColor={error ? theme.colors.red : theme.colors.blueRibbon}
            fontSize={'16'}
            onClick={onClick}
          >
            {btnContent}
          </ButtonMaterial>
        </ButtonWrapper>
      </ModalWrapper>
    </ModalContainer>
  </Modal>
)

export default ResponseModal
