import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ghost};
  cursor: pointer;
  transition: background 0.15s ease;
  border-left: 5px solid ${({ theme }) => theme.colors.transparent};
  background-color: ${({ selected }) => (selected ? '#f9f9f9' : 'transparent')};
  &:hover {
    background-color: #f9f9f9;
  }
`

export const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`

export const Batch = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.waterloo};
  font-size: 16px;
  font-weight: 400;
  margin-left: 5px;
`

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Subtitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'flex-start'};
`

export const Content = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 400;
  padding-top: 5px;
  cursor: pointer;
`
