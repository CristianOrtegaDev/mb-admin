import React from 'react'
import Bell from 'assets/icons/bell.png'
import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 18px;
  font-family: ${({ theme }) => theme.fonts.roboto};
  border-left: 2px solid ${({ theme }) => theme.colors.alabaster};
  border-right: 2px solid ${({ theme }) => theme.colors.alabaster};
  cursor: pointer;

  ${mediaQueries.tablet`
    padding: 10px;
  `};
`

const StyledImg = styled.img`
  width: 18px;
  cursor: pointer;
`

class Notifications extends React.Component {
  render() {
    return (
      <Container>
        <StyledImg src={Bell} />
      </Container>
    )
  }
}

export default Notifications
