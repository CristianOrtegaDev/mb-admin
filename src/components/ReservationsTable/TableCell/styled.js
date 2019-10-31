import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const TableCellContainer = styled.button`
  height: 35px;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme, isEnabled }) =>
    isEnabled ? theme.colors.blueRibbonTransparent1 : theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.mystic};
  cursor: ${({ isEnabled }) => (isEnabled ? 'pointer' : 'inherit')};
  outline: none;
  
  &:hover {
    background-color: ${({ theme, isEnabled }) =>
      isEnabled ? theme.colors.blueRibbonTransparent2 : theme.colors.white};
  }

  ${({ isEnabled }) =>
    isEnabled &&
    css`
      border-right: 1px solid ${({ theme }) => theme.colors.blueRibbon};
      border-left: 1px solid ${({ theme }) => theme.colors.blueRibbon};
    `}

  ${({ initial }) =>
    initial &&
    css`
      border-top: 1px solid ${({ theme }) => theme.colors.blueRibbon};
    `}

  ${({ final }) =>
    final &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.blueRibbon};
    `}
`

export const ReservedLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.blueRibbon};
  transform: rotate(-20deg);
`
