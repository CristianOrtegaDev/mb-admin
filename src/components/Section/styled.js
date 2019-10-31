import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  ${mediaQueries.tablet`
    padding-top: 10px;
  `}
`

export const SectionTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 28px;
  font-weight: 700;
  margin: 15px 0;
`

export const Wrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.ghost};
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueRibbon};
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 18px;
  font-weight: 500;
  padding: 15px 32px;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
`

export const BackButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 25px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  ${mediaQueries.tablet`
        margin: 20px 0;
  `}
`

export const StyledImg = styled.img`
  width: 20px;
`
