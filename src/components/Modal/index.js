import React from 'react'
import AnimationWrapper from 'components/AnimationWrapper'
import Page from 'components/Page'
import theme from 'config/theme'
import { Container } from './styled'

class Modal extends React.Component {
  render() {
    const { children, withOutPage } = this.props
    return (
      <Container>
        {!withOutPage && (
          <Page backgroundColor={theme.colors.transparentBlack} overflow={'auto'} narrow>
            <AnimationWrapper>{children}</AnimationWrapper>
          </Page>
        )}
        {withOutPage && children}
      </Container>
    )
  }
}

export default Modal
