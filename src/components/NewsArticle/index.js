import React from 'react'
import {
  ExtendedContentWrapper,
  ElementContainer,
  Element,
  SliderWrapper,
  Paragraph,
  BoldParagraph
} from './styled'
import HomeBaseContent from 'components/HomeBaseContent'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class NewsArticle extends React.Component {
  renderExtendedContent = () => {
    const { sliderImages, boldContent, content } = this.props
    return (
      <ExtendedContentWrapper>
        <BoldParagraph>{boldContent}</BoldParagraph>
        <Paragraph>{content}</Paragraph>
        {this.renderSlider(sliderImages)}
      </ExtendedContentWrapper>
    )
  }

  renderSlider = sliderImages => {
    const sliderSettings = {
      centerMode: true,
      slidesToShow: 1,
      arrows: false
    }

    return (
      <SliderWrapper>
        <Slider {...sliderSettings}>
          {sliderImages.map((img, imgIndex) => (
            <ElementContainer key={imgIndex}>
              <Element src={img} />
            </ElementContainer>
          ))}
        </Slider>
      </SliderWrapper>
    )
  }

  render() {
    const {
      extended,
      title,
      subTitle,
      articleImage,
      userName,
      type,
      userImage,
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
        onClick={onClick}
        date={publicationdate}
        onDelete={onDelete}
        privateContent
      >
        {extended && this.renderExtendedContent()}
      </HomeBaseContent>
    )
  }
}

export default NewsArticle
