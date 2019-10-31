import React from 'react'
import { getExtendedDate } from 'utils/dateParser'
import {
  Row,
  AvatarImg,
  NameWrapper,
  Name,
  ContentContainer,
  Content,
  Separator,
  ButtonContainer,
  ButtonWrapper,
  StyledButton,
  StyledImg,
  DetailWrapper
} from './styled'
import classNames from 'classnames'
import DetailContainer from 'components/DetailContainer'

class MessageDetail extends React.Component {
  renderDetail = () => {
    const {
      id,
      pos,
      name,
      type,
      categoryId,
      category,
      avatar,
      date,
      eventTitle,
      subtitle,
      pictureUrl
    } = this.props.message
    return (
      <DetailContainer>
        <Row justify={'space-between'} align={'center'}>
          <Row widthAuto>
            <AvatarImg src={avatar} />
            <NameWrapper>
              <Name>{name}</Name>
            </NameWrapper>
          </Row>
          <label>{getExtendedDate(date)}</label>
        </Row>
        {categoryId && (
          <Row justify={'flex-end'} align={'center'}>
            <NameWrapper>{`Numero de Ticket: ${id}`}</NameWrapper>
          </Row>
        )}
        <ContentContainer>
          {type && <Content>{type}</Content>}
          {category && <Content>{category}</Content>}
          {eventTitle && <Content>{eventTitle}</Content>}
          <Content>{subtitle}</Content>
        </ContentContainer>
        {pictureUrl && <StyledImg src={pictureUrl} />}
        <Separator />
        <ButtonContainer>
          {this.props.hasResponse && (
            <ButtonWrapper onClick={() => this.props.onResponseClick(pos)}>
              <StyledButton>{'Responder'}</StyledButton>
            </ButtonWrapper>
          )}
        </ButtonContainer>
      </DetailContainer>
    )
  }

  renderEmpyDetail = () => (
    <DetailContainer>
      <label>{'Seleccione un mensaje'}</label>
    </DetailContainer>
  )

  render() {
    return (
      <DetailWrapper className={classNames('portal-hide-scrollbars')}>
        {this.props.message ? this.renderDetail() : this.renderEmpyDetail()}
      </DetailWrapper>
    )
  }
}

export default MessageDetail
