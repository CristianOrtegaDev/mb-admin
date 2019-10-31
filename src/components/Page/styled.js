import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const PageWrapper = styled.div`
  height: ${({ withHeader }) => (withHeader ? 95 : 100)}%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.colors.alabaster};
  overflow-y: auto;

  ${mediaQueries.tablet`
    height: ${({ withHeader }) => (withHeader ? 93 : 100)}%;
    padding: 0 16px;
  `};
`

export default PageWrapper
