import React from 'react'
import Message from 'assets/icons/message.png'
import styled from 'styled-components'

const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ withMargin }) => (withMargin ? '40px' : '0px')};
`

const EmptyMessage = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
`

const PageEmpty = ({ message, icon, withMargin }) => (
  <EmptyWrapper withMargin={withMargin}>
    <img src={icon || Message} />
    <EmptyMessage>{message}</EmptyMessage>
  </EmptyWrapper>
)

export default PageEmpty
