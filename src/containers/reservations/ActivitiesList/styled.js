import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow: auto;
`

export const ActivityContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 15px 0px 15px 30px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.alabaster : theme.colors.transparent};
  border-top: 1px solid
    ${({ theme, selected }) => (selected ? theme.colors.mercury : theme.colors.transparent)};
  border-bottom: 1px solid
    ${({ theme, selected }) => (selected ? theme.colors.mercury : theme.colors.transparent)};
  transition: background 0.15s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.alabaster};
    border-top: 1px solid ${({ theme }) => theme.colors.mercury};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mercury};
  }
`

export const ImageWrapper = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.blueRibbon};
  cursor: pointer;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`
export const Name = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: ${({ selected }) => (selected ? 500 : 400)};
  font-size: 18px;
  margin-left: 20px;
  cursor: pointer;
`
