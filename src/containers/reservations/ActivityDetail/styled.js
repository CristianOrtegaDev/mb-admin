import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const StyledLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'flex-start'};
`

export const SelectWrapper = styled.div`
  width: 65%;
  cursor: pointer;
  margin-right: 30px;
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

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blueRibbon};
  border: 1px solid ${({ theme }) => theme.colors.blueRibbon};
  font-size: 16px;
  font-weight: 500;
  padding: 12px 25px;
  border-radius: 25px;
  margin: 20px 0;
  cursor: pointer;
  outline: none;
`

export const TableWrapper = styled.div`
  margin-top: 25px;
`
