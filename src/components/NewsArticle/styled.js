import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const ExtendedContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 22px;
  box-sizing: border-box;

  ${mediaQueries.tablet`
    padding: 16px;
  `}
`

export const ElementContainer = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 320px;
  background-color: white;
`

export const Element = styled.div`
  width: 95%;
  height: 100%;
  margin: 0 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${({ src }) => src});
`

export const SliderWrapper = styled.div`
  margin: 20px 0;
`

export const Paragraph = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
`

export const BoldParagraph = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
`
