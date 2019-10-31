import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 50%;
  height: 30%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.ghost};
`

export const CrossWrapper = styled.div`
  text-align: end;
`

export const ErrorWrapper = styled.div`
  text-align: end;
  flex-direction: column;
  display: flex;
`

export const SectionTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 28px;
  font-weight: 700;
  margin: 0px 0px 20px 0px;
`

export const SectionError = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-size: 16px;
  font-weight: 400;
  margin: 0px 0px 5px 0px;
  text-align: center;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80%;
  justify-content: space-around;
`

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 18px;
  font-weight: 500;
  padding: 15px 32px;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  width: 150px;
`

export const CrossImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 20px 20px 0px 20px;
`
