import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export const ImageWrapper = styled.div`
  width: 60%;
  heigth: 100%;

  ${mediaQueries.tablet`
    display: none;
  `}
`

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`
export const FormContainer = styled.form`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 600px;

  ${mediaQueries.tablet`
    width: 100%;
  `}
`

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  box-sizing: border-box;
  max-width: 600px;
  margin: 0 auto;
`

export const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blueRibbon};
  font-size: 50px;
  margin-top: 90px;
  margin-bottom: 24px;
`

export const SubTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blueRibbon};
  font-size: 26px;
`

export const ContentLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.tundora};
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 15px;
`

export const ButtonWrapper = styled.div`
  padding: 0 15%;
  margin: ${({ margin }) => margin}px 0;
`

export const ErrorLabel = styled.label`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`
