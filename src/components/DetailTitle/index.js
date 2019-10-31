import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 15px;
`

const DetailTitle = ({ children }) => <StyledTitle>{children}</StyledTitle>

export default DetailTitle
