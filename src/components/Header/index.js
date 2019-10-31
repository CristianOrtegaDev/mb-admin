import React from 'react'
import styled from 'styled-components'
import HeaderMenu from './HeaderMenu'
import Notifications from './Notifications'
import UserLogged from './UserLogged'
import { getPage } from 'utils/url'
import { withRouter } from 'react-router-dom'
import HeaderImage from 'assets/mi-barrio.png'
import mediaQueries from 'config/media-queries'
import MenuIcon from 'assets/icons/menu.png'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.alabaster};
`

const InfoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries.tablet`
    justify-content: flex-end;
  `};
`

const HeaderImg = styled.img`
  padding: 0 20px;
  width: 140px;

  ${mediaQueries.tablet`
    display: none;
  `};
`

const HeaderIcon = styled.img`
  display: none;
  width: 25px;
  height: 20px;
  margin-left: 16px;
  cursor: pointer;

  ${mediaQueries.tablet`
    display: block;
  `};
`

const Header = ({ location }) => {
  const currentPage = getPage(location.pathname)

  return (
    <Container>
      <ContentWrapper>
        <HeaderIcon src={MenuIcon} onClick={() => alert('open menu')} />
        <HeaderImg src={HeaderImage} />
        <InfoContainer>
          <HeaderMenu active={currentPage} />
          <Notifications />
          <UserLogged />
        </InfoContainer>
      </ContentWrapper>
    </Container>
  )
}

export default withRouter(Header)
