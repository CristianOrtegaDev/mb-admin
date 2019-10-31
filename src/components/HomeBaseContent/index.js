import React from 'react'
import {
  Container,
  ArticleImage,
  InfoContainer,
  InteractionContainer,
  NewArticleImage,
  OpacityWrapper,
  SubTitle,
  Title,
  TitleContainer,
  Type,
  UserName,
  TextHeaderContainer,
  TextHeader,
  DateHeaderContainer,
  DateHeader
} from './styled'
import { getExtendedDate } from 'utils/dateParser'
import DeleteIcon from '@material-ui/icons/DeleteOutline'

class HomeBaseContent extends React.Component {
  renderBaseInfo = () => {
    const { userName, type, userImage, onClick } = this.props
    return (
      <InteractionContainer onClick={onClick}>
        <InfoContainer>
          <NewArticleImage src={userImage} type={'cover'} />
          <TitleContainer>
            <UserName>{userName}</UserName>
            <Type>{type}</Type>
          </TitleContainer>
        </InfoContainer>
      </InteractionContainer>
    )
  }

  renderMainImage = () => {
    const { title, subTitle, articleImage, withoutBaseInfo } = this.props
    return (
      <ArticleImage src={articleImage}>
        {!withoutBaseInfo && (
          <OpacityWrapper>
            <SubTitle>{subTitle}</SubTitle>
            <Title>{title}</Title>
          </OpacityWrapper>
        )}
      </ArticleImage>
    )
  }

  renderTextHeader = () => (
    <TextHeaderContainer>
      <TextHeader>{this.props.textHeaderContent}</TextHeader>
    </TextHeaderContainer>
  )

  renderDateHeader = () => (
    <DateHeaderContainer>
      <div>
        <DateHeader>{getExtendedDate(this.props.date)}</DateHeader>
      </div>
      <button
        onClick={this.props.onDelete}
        style={{ background: 'none', borderWidth: 'inherit', cursor: 'pointer' }}
      >
        <DeleteIcon style={{ color: 'grey' }} />
      </button>
    </DateHeaderContainer>
  )

  render() {
    const { extended, children, articleImage, withoutBaseInfo, date } = this.props
    return (
      <Container>
        {date && this.renderDateHeader()}
        {!articleImage && this.renderTextHeader()}
        {articleImage && this.renderMainImage()}
        {!withoutBaseInfo && this.renderBaseInfo()}
        {extended && children}
      </Container>
    )
  }
}

export default HomeBaseContent
