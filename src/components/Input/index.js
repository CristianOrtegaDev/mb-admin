import React from 'react'
import styled, { css } from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.roboto};
  padding: 8px 10px;
  box-sizing: border-box;
  font-size: ${({ size }) => size || 16}px;
  color: ${({ theme }) => theme.colors.black};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'inherit')};
  outline: none;

  ${({ borderBottom, withoutBorder }) =>
    !withoutBorder && borderBottom
      ? css`
          border-top-left-radius: 10px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          border: 2px solid ${({ theme }) => theme.colors.transparent};
          border-bottom: 2px solid ${({ theme }) => theme.colors.alto};
        `
      : css`
          border: 2px solid ${({ theme, error }) => (error ? theme.colors.red : theme.colors.alto)};
          border-radius: 4px;
        `}

  ${({ withoutBorder }) =>
    withoutBorder &&
    css`
      border: none;
    `}

  ${({ borderBottom, withoutBorder }) =>
    !withoutBorder &&
    !borderBottom &&
    css`
      &:focus {
        border: 2px solid ${({ theme }) => theme.colors.blueRibbon};
      }
    `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
    font-family: ${({ theme }) => theme.fonts.regular};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledGray};
    border: solid 2px ${({ theme }) => theme.colors.alto};
  }
`

const Input = props => <StyledInput {...props} />

export default Input
