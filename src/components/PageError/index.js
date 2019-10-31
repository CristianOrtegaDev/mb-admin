import React from 'react'
import AnimationWrapper from 'components/AnimationWrapper'
import DeleteImage from 'assets/icons/cancel.png'
import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  width: 100%;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 100px;
`

export const ErrorImg = styled.img`
  width: 120px;
  margin-bottom: 30px;

  ${mediaQueries.tablet`
    margin-bottom: 10px;
  `}
`

export const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 20px;

  ${mediaQueries.tablet`
    margin-bottom: 10px;
  `}
`

export const Message = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.tundora};
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`

export const ReloadLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blueRibbon};
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`

const PageError = ({ onReload }) => (
  <AnimationWrapper>
    <Container>
      <ErrorImg src={DeleteImage} />
      <Title>{'Ups!'}</Title>
      <Message>{'Ha habido un error al solicitar los datos de la pagina'}</Message>
      <ReloadLabel onClick={onReload}>{'Recargar'}</ReloadLabel>
    </Container>
  </AnimationWrapper>
)

export default PageError
