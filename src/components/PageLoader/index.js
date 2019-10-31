import React from 'react'
import Spinner from 'react-spinner-material'
import styled from 'styled-components'

const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const LoaderWrapper = styled(EmptyWrapper)`
  padding: 40px 0;
  min-height: ${({ customHeight }) => customHeight || 560}px;
  border-radius: 10px;
`

const PageLoader = ({ customHeight }) => (
  <LoaderWrapper customHeight={customHeight}>
    <Spinner />
  </LoaderWrapper>
)

export default PageLoader
