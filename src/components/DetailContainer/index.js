import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 30px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.colors.mercury};
  border-radius: 5px;
  box-sizing: border-box;
`

const DetailContainer = ({ children }) => (
  <Container>
    <Wrapper>{children}</Wrapper>
  </Container>
)

export default DetailContainer
