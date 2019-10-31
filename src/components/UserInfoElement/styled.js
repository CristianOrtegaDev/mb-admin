import styled, { css } from 'styled-components'

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.mercury};
  border-radius: 5px;
`

export const Row = styled.div`
  width: ${({ widthAuto }) => (widthAuto ? 'auto' : '100%')};
  display: flex;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
`

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
`

export const DataLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ noMargin, theme }) => (noMargin ? theme.colors.black : theme.colors.midGray)};
  font-size: 18px;
  font-weight: 700;

  ${({ noMargin }) =>
    !noMargin &&
    css`
      margin: 15px 0;
      margin-right: 5px;
    `}
`

export const DataContent = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.midGray};
  font-size: 18px;
  font-weight: 500;
  ${({ noMargin }) =>
    !noMargin
      ? css`
          margin: 15px 0;
        `
      : css`
          margin-top: 15px;
        `}
`

export const GuestState = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.red};
`

export const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mercury};
  margin-top: ${({ noMargin }) => (noMargin ? 15 : 40)}px;
  margin-bottom: ${({ noMargin }) => (noMargin ? 15 : 10)}px;
`
