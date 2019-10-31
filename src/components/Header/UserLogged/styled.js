import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 18px;
  font-family: ${({ theme }) => theme.fonts.roboto};

  ${mediaQueries.tablet`
    padding: 10px;
  `};
`

export const UserWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'initial')};
`

export const UserImg = styled.img`
  width: ${({ small }) => (small ? 30 : 70)}px;
  height: ${({ small }) => (small ? 30 : 70)}px;
  border-radius: 50%;
`

export const UserLabel = styled.label`
  width: auto;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ small }) => (small ? 12 : 18)}px;
  margin-left: ${({ small }) => (small ? 10 : 20)}px;
  margin-right: ${({ small }) => (small ? 10 : 0)}px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'initial')};
`

export const StyledImg = styled.img`
  width: 18px;
  cursor: pointer;
`

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`

export const Wrapper = styled.div`
  width: 25%;
  height: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};

  ${mediaQueries.tablet`
    width: 80%;
  `};
`

export const CrossImage = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
  right: 25px;
  cursor: pointer;
`

export const ElementWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.alto};
`

export const NeighbourhoodsLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  padding: 10px 0;
  font-weight: 500;
`

export const NeighbourhoodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  margin-right: 30px;
  cursor: pointer;
`

export const NeighbourhoodName = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 500 : 400)};
  margin-top: 5px;
  cursor: pointer;
`

export const NeighbourhoodElement = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  border-radius: 50%;
  font-family: ${({ theme }) => theme.fonts.roboto};
  border: 1px solid
    ${({ selected, theme }) => (selected ? theme.colors.blueRibbon : theme.colors.steelGray)};
  color: ${({ selected, theme }) => (selected ? theme.colors.blueRibbon : theme.colors.steelGray)};
  font-size: 22px;
  font-weight: 400;
  cursor: pointer;
`

export const CheckedElement = styled.img`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  cursor: pointer;
`

export const LogoutLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blueRibbon};
  font-size: 18px;
  padding: 20px 0;
  cursor: pointer;
`
