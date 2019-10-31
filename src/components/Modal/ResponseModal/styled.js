import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const ModalContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding: 50px 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, error }) => (error ? theme.colors.red : theme.colors.blueRibbon)};
  border-radius: 10px;

  ${mediaQueries.tablet`
      padding: 30px 0px;
      width: 100%;
  `}
`

export const Confirm = styled.img`
  width: 100px;
  height: 100px;
  border: 8px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
`

export const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  margin-top: 35px;
`

export const SubTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;

  ${mediaQueries.tablet`
    margin-bottom: 20px;
  `}
`

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 30px 22%;

  ${mediaQueries.tablet`
    padding: 20px 22%;
  `}
`
