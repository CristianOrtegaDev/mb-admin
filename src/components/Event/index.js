import React from 'react'
import HomeBaseContent from 'components/HomeBaseContent'
import {
  ExtendedContainer,
  ExtendedContent,
  ExtendedTitle,
  ExtendedWrapper,
  UserImage
} from './styled'

class Event extends React.Component {
  renderExtendedContent = () => {
    const { title, userImage, content } = this.props
    return (
      <ExtendedContainer>
        <UserImage src={userImage} />
        <ExtendedWrapper>
          <ExtendedTitle>{title}</ExtendedTitle>
          <ExtendedContent>{content}</ExtendedContent>
        </ExtendedWrapper>
      </ExtendedContainer>
    )
  }

  render() {
    const {
      title,
      subTitle,
      userName,
      type,
      articleImage,
      userImage,
      extended,
      onClick,
      publicationdate,
      onDelete
    } = this.props
    return (
      <HomeBaseContent
        title={title}
        subTitle={subTitle}
        userName={userName}
        type={type}
        articleImage={articleImage}
        userImage={userImage}
        extended={extended}
        withoutBaseInfo={extended}
        onClick={onClick}
        date={publicationdate}
        onDelete={onDelete}
      >
        {extended && this.renderExtendedContent()}
      </HomeBaseContent>
    )
  }
}

export default Event
