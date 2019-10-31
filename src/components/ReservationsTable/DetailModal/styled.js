import styled, { css } from 'styled-components'

export const DetailContainer = styled.button`
  width: 230px;
  padding: 10px 15px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  outline: none;
  border: none;
  z-index: 999;
  cursor: auto;

  ${({ bottomPopUp }) =>
    bottomPopUp
      ? css`
          bottom: 15px;
        `
      : css`
          top: 15px;
        `}

  ${({ leftPopUp }) =>
    leftPopUp
      ? css`
          right: 15px;
          border-right: 5px solid ${({ theme }) => theme.colors.blueRibbon};
        `
      : css`
          left: 15px;
          border-left: 5px solid ${({ theme }) => theme.colors.blueRibbon};
        `}
`

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

export const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 500;
`

export const Name = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.tundora};
  font-size: 14px;
  margin-top: 10px;
`

export const CancelButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  background-color: ${({ theme }) => theme.colors.redOpaced};
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`

export const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
`

export const ErrorLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
  margin-top: 5px;
`

export const SaveButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blueRibbon};
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`

export const Close = styled.img`
  width: 10px;
  cursor: pointer;
`
