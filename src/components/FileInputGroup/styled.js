import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: ${({ align }) => align || 'flex-start'};
  justify-content: ${({ justify }) => justify || 'space-between'};
  margin-bottom: ${({ error }) => (error ? 0 : 10)}px;
`

export const InputWrapper = styled.div`
  width: ${({ width }) => width || 100}%;
`

export const InputLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  padding-bottom: 10px;
`

export const ErrorLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  font-weight: 500;
`
