import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const ExtendedContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 16px 22px;
  box-sizing: border-box;

  ${mediaQueries.tablet`
    padding: 16px;
  `}
`

export const UserImage = styled.div`
  position: absolute;
  height: 60px;
  width: 60px;
  top: -30px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${({ src }) => src});
`

export const ExtendedWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const ExtendedTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 500;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
  text-align: center;
`

export const ExtendedContent = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
`
