import React from 'react'
import styled from 'styled-components'

const StyledTextArea = styled.textarea`
  width: 100%;
  border: 2px solid ${({ theme, error }) => (error ? theme.colors.red : theme.colors.alto)};
  font-family: ${({ theme }) => theme.fonts.roboto};
  border-radius: 7px;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  color: ${({ theme }) => theme.colors.black};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'inherit')};
  max-width: 800px;
  min-width: 800px;
  max-height: ${({ maxHeight }) => maxHeight || '400'}px;
  min-height: ${({ minHeight }) => minHeight || '250'}px;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.blueRibbon};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.regular};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledGray};
    border: solid 2px ${({ theme }) => theme.colors.alto};
  }
`

const TextArea = props => <StyledTextArea {...props} />

export default TextArea
