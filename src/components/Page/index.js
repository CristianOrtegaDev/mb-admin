import React, { Fragment } from 'react'
import PageBlock from 'components/PageBlock'
import { PageWrapper } from './styled'

const Page = ({ children, ...otherProps }) => (
  <Fragment>
    <PageWrapper {...otherProps}>
      <PageBlock {...otherProps}>{children}</PageBlock>
    </PageWrapper>
  </Fragment>
)

export default Page
