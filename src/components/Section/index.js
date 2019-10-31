import React from 'react'
import LeftArrow from 'assets/icons/arrow-left.png'
import {
  Container,
  Wrapper,
  SectionTitle,
  Row,
  StyledButton,
  BackButton,
  StyledImg
} from './styled'

const Section = ({ title, children, btnContent, onBtnClick, onBack, styledHeader }) => (
  <Container>
    <Row>
      <Row>
        {onBack && (
          <BackButton onClick={onBack}>
            <StyledImg src={LeftArrow} />
          </BackButton>
        )}
        <SectionTitle>{title}</SectionTitle>
      </Row>
      {!styledHeader && btnContent && (
        <StyledButton onClick={onBtnClick}>{btnContent}</StyledButton>
      )}
      {styledHeader && styledHeader()}
    </Row>
    <Wrapper>{children}</Wrapper>
  </Container>
)

export default Section
