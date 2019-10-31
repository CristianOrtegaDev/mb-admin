import React from 'react'
import styled from 'styled-components'
import Resource from 'components/Resource'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@material-ui/core/CircularProgress'
import theme from 'config/theme'

export const ScrollWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.white};

  &::-webkit-scrollbar {
    display: none;
  }
`

export const InfiniteLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px 0;
`

export const NoContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blueRibbon};
  font-size: 20px;
  padding: 20px 0;
`

const ResourcesList = ({
  elements,
  onClick,
  selectedPos,
  fetchMoreContent,
  hasMore,
  noMoreContentMsg
}) => (
  <InfiniteScroll
    scrollableTarget={'scrollContainer'}
    dataLength={elements.length}
    next={fetchMoreContent}
    hasMore={hasMore}
    loader={
      <InfiniteLoaderWrapper>
        <CircularProgress size={30} color={theme.colors.blueRibbon} />
      </InfiniteLoaderWrapper>
    }
    endMessage={
      <NoContentContainer style={{ textAlign: 'center' }}>{noMoreContentMsg}</NoContentContainer>
    }
  >
    <ScrollWrapper>
      {elements.map((e, i) => (
        <Resource
          title={e.title}
          subtitle={e.subtitle}
          extraInfo={e.extraInfo}
          avatar={e.avatar}
          key={i}
          onClick={() => onClick(e)}
          selected={i === selectedPos}
          withAvatar={e.withAvatar}
          avatarWithPadding={e.avatarWithPadding}
          avatarCentered={e.avatarCentered}
        />
      ))}
    </ScrollWrapper>
  </InfiniteScroll>
)

export default ResourcesList
