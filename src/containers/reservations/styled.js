import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 600px;
`

export const ActivitiesContainer = styled.div`
  width: 30%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.alto};
  min-height: 600px;
  padding: 20px 0;
`

export const DetailContainer = styled.div`
  width: 70%;
  height: 100%;
  min-height: 600px;
  padding: 20px 60px;
  box-sizing: border-box;
`

export const StyledTitle = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 500;
  font-size: 20px;
  margin: 0px 0px 10px 30px;
`
