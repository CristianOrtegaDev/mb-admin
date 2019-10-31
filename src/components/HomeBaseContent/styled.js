import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 20px;
`

export const ArticleImage = styled.div`
  width: 100%;
  height: 320px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${({ src }) => src});
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
`

export const InteractionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 22px;
  box-sizing: border-box;
  cursor: pointer;

  ${mediaQueries.tablet`
    padding: 16px;
  `}
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 12px;
`

export const UserName = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`

export const Type = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  margin-top: 2px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.midGray};
`

export const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const NewArticleImage = styled.div`
  height: ${({ pointer }) => (pointer ? '30' : '40')}px;
  width: ${({ pointer }) => (pointer ? '30' : '40')}px;
  border-radius: 50%;
  background-size: ${({ type }) => type};
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${({ src }) => src});
  background-color: ${({ theme, pointer }) =>
    pointer ? theme.colors.transparent : theme.colors.blueRibbon};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'inherit')};
`

export const OpacityWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px 22px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.transparentBlack};
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;

  ${mediaQueries.tablet`
    padding: 16px;
  `}
`

export const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 500;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
`

export const SubTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
`

export const TextHeaderContainer = styled.div`
  width: 100%;
  padding: 16px 22px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.athensGray};

  ${mediaQueries.tablet`
    padding: 16px;
  `}
`

export const DateHeaderContainer = styled.div`
  width: 100%;
  padding-bottom: 16px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
`

export const DateHeader = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.warmGrey};
`

export const TextHeader = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`

export const LockImage = styled.img`
  width: 19px;
  height: 22px;
`
