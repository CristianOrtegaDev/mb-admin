import styled from 'styled-components'

export const FormContainer = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 100px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ error }) => (error ? 0 : 15)}px;
`

export const InputWrapper = styled.div`
  width: ${({ width }) => width || 100}%;
`

export const ErrorLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-size: 14px;
  padding-top: 10px;
  font-weight: 500;
`

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueRibbon};
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 18px;
  font-weight: 500;
  padding: 12px 60px;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
`

export const CrossImage = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 25px;
  right: 30px;
  cursor: pointer;
`

export const Separator = styled.div`
  margin: 25px 0;
`
