import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 100px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  margin: ${({ margin }) => margin || 0};
`

export const Column = styled.div`
  width: ${({ width }) => width || '100%'};
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
`

export const StyledLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
`

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueRibbon};
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 18px;
  font-weight: 500;
  padding: 12px 60px;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
`

export const CrossImage = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 25px;
  right: 30px;
  cursor: pointer;
`

export const ActionLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme, error }) => (error ? theme.colors.red : theme.colors.blueRibbon)};
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 10px;
  text-decoration: underline;
  cursor: pointer;
`

export const TableWrapper = styled.div`
  padding-top: 20px;
`

export const ErrorLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  padding-top: 10px;
  font-weight: 500;
`
