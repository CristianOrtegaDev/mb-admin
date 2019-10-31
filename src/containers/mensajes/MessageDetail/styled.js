import styled from 'styled-components'

export const DataContainer = styled.div`
  width: 65%;
  height: 100%;
  max-height: 550px;
  padding: 20px 25px;
  border-bottom-right-radius: 10px;
  overflow-y: auto;
`

export const Row = styled.div`
  width: ${({ widthAuto }) => (widthAuto ? 'auto' : '100%')};
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
`

export const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blueRibbon};
`

export const Name = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
`

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`

export const Content = styled.label`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  line-height: 26px;
  margin: 5px 0;
`

export const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mercury};
  margin-bottom: 20px;
`

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`

export const ButtonWrapper = styled.div`
  width: 30%;
`

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blueRibbon};
  border: 1px solid ${({ theme }) => theme.colors.blueRibbon};
  font-size: 18px;
  font-weight: 500;
  padding: 13px 30px;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
`

export const StyledImg = styled.img`
  margin-bottom: 20px;
`

export const DetailWrapper = styled.div`
  width: 70%;
  max-height: 600px;
  overflow: auto;
  min-height: 600px;
  box-sizing: border-box;
`
