import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const Column = styled.div`
  width: ${({ widthAuto, width }) => (widthAuto ? 'auto' : width || 100)}%;

  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'flex-start'};
`

export const Row = styled.div`
  width: ${({ widthAuto }) => (widthAuto ? 'auto' : '100%')};
  display: flex;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
  margin: ${({ noMargin }) => (noMargin ? 0 : '8px 0')};
`

export const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: blue;
  flex-shrink: 0;
  margin-right: 20px;
`

export const DataLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.tundora};
  font-size: 18px;
  font-weight: 500;
`

export const DataContent = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.tundora};
  font-size: 16px;
  font-weight: 400;
  margin-left: 10px;
`
