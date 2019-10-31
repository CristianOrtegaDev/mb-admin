import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page from 'components/Page'
import Section from 'components/Section'
import StyledTabs from 'components/StyledTabs'
import EmptyWrapper from 'components/PageEmpty'
import EmptyLoader from 'components/PageLoader'
import DetailContainer from 'components/DetailContainer'
import NewsArticle from 'components/NewsArticle'
import Event from 'components/Event'
import ResourceList from 'components/ResourceList'
import mapFeedToNovelty from 'selectors/mapFeedToNovelty'
import {
  fetchFeedEvent,
  fetchFeedNews,
  deleteArticleById,
  deleteEventById
} from 'store/actions/feed.actions'
import { setSelectedResource, resetSelectedResource } from 'store/actions/selectedResource'
import { Wrapper, ListWrapper, DetailWrapper, ContentWrapper } from './styled'
import NewPublication from './NewPublication'
import classNames from 'classnames'
import DeleteConfirmation from 'components/DeleteConfirmation'
import styled from 'styled-components'

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  align-items: normal;

  &:before {
    animation: portal-profile-before 0.6s ease-out forwards 1;
    animation-delay: 0.2s;
  }
  &:after {
    animation: portal-profile-after 0.4s ease-out forwards 1;
    animation-delay: 0.4s;
  }
`

class Feed extends React.Component {
  state = {
    newPublication: false,
    deleteConfirmation: false,
    publicationToDelete: '',
    tabEnabled: 0
  }

  componentDidMount = () => {
    this.props.resetSelectedResource()
    this.props.fetchFeedEvent()
    this.props.fetchFeedNews()
  }

  onFetchNovelties = () => {
    if (this.isArticleEnabled()) {
      this.props.fetchFeedNews()
    }
    this.props.fetchFeedEvent()
  }

  toggleNewPublication = () => this.setState({ newPublication: !this.state.newPublication })

  isLoading = () =>
    this.props.loadingArticles &&
    this.props.loadingEvents &&
    !this.props.events.length &&
    !this.props.articles.length

  isLoadingContent = () =>
    this.isArticleEnabled()
      ? this.props.loadingArticles && !this.props.articles.length
      : this.props.loadingEvents && !this.props.events.length

  isArticleEnabled = () => this.state.tabEnabled === 0

  isEventsAvaiable = () => this.props.events.length

  isArticlesAvaiable = () => this.props.articles.length

  handleTabChange = (event, tabEnabled) => {
    this.props.resetSelectedResource()
    this.setState({ tabEnabled })
  }

  renderPageContent = () => (
    <Wrapper>
      <StyledTabs
        value={this.state.tabEnabled}
        tabs={[
          { label: 'Noticias', value: this.props.articles.length },
          { label: 'Eventos', value: this.props.events.length }
        ]}
        handleTabChange={this.handleTabChange}
      />
      {this.isLoadingContent() ? <EmptyLoader /> : this.renderContent()}
    </Wrapper>
  )

  renderContent = () =>
    this.isContentAvaiable() ? (
      <ContentWrapper>
        {this.renderList()}
        {this.renderDetail()}
      </ContentWrapper>
    ) : (
      <EmptyWrapper message={`No hay ${this.getActiveResourceName()} disponibles`} withMargin />
    )

  renderList = () => (
    <ListWrapper id={'scrollContainer'}>
      <ResourceList
        elements={this.isArticleEnabled() ? this.props.articles : this.props.events}
        onClick={this.handleResourceClick}
        selectedPos={this.props.selectedResource ? this.props.selectedResource.pos : null}
        noMoreContentMsg={`No hay mas ${this.getActiveResourceName()} disponibles`}
        fetchMoreContent={() =>
          this.isArticleEnabled() ? this.props.fetchFeedNews() : this.props.fetchFeedEvent()
        }
        hasMore={this.isArticleEnabled() ? this.props.hasMoreArticles : this.props.hasMoreEvents}
      />
    </ListWrapper>
  )

  getActiveResourceName = () => (this.isArticleEnabled() ? 'artículos' : 'eventos')

  handleResourceClick = resource => this.props.setSelectedResource(resource)

  renderDetail = () => (
    <DetailWrapper className={classNames('portal-hide-scrollbars')}>
      <DetailContainer>
        {this.props.selectedResource ? (
          this.isArticleEnabled() ? (
            <NewsArticle
              title={this.props.selectedResource.title}
              subTitle={this.props.selectedResource.subtitle}
              userName={this.props.selectedResource.creationuserfullname}
              type={'Novedad'}
              articleImage={this.props.selectedResource.headerimageurl}
              userImage={this.props.selectedResource.creationuserimageurl}
              sliderImages={this.props.selectedResource.newsimagesurls}
              content={this.props.selectedResource.body}
              boldContent={this.props.selectedResource.boldparagraph}
              publicationdate={this.props.selectedResource.publicationdate}
              onDelete={() =>
                this.setState({
                  deleteConfirmation: true,
                  publicationToDelete: this.props.selectedResource.id
                })
              }
              extended
            />
          ) : (
            <Event
              title={this.props.selectedResource.title}
              subTitle={this.props.selectedResource.subtitle}
              userName={this.props.selectedResource.creationuserfullname}
              type={'Evento'}
              articleImage={this.props.selectedResource.headerimageurl}
              userImage={this.props.selectedResource.creationuserimageurl}
              content={this.props.selectedResource.body}
              publicationdate={this.props.selectedResource.publicationdate}
              onDelete={() =>
                this.setState({
                  deleteConfirmation: true,
                  publicationToDelete: this.props.selectedResource.id
                })
              }
              extended
            />
          )
        ) : (
          <label>{'Seleccione un elemento'}</label>
        )}
      </DetailContainer>
    </DetailWrapper>
  )

  onDelete = async id => {
    if (this.isArticleEnabled()) {
      await this.props.deleteArticleById(id)
    } else {
      await this.props.deleteEventById(id)
    }
    if (this.props.deletedArticle || this.props.deletedEvent) {
      this.onFetchNovelties()
      this.props.setSelectedResource('')
      this.handleDeleteConfirmationClose()
    }
  }

  isContentAvaiable = () =>
    this.isArticleEnabled() ? this.props.articles.length > 0 : this.props.events.length > 0

  handleFormClose = reset => {
    if (reset) {
      this.props.fetchFeedEvent()
      this.props.fetchFeedNews()
    }
    this.setState({ newPublication: false })
  }

  handleDeleteConfirmationClose = () => {
    this.setState({ deleteConfirmation: false, publicationToDelete: '' })
  }

  render() {
    return (
      <Page>
        <PageWrapper>
          <Section
            title={'Administrar noticias y eventos'}
            btnContent={'Nueva publicación'}
            onBtnClick={() => this.toggleNewPublication()}
          >
            {this.renderPageContent()}
          </Section>
          {this.state.newPublication && <NewPublication onClose={this.handleFormClose} />}
          {this.state.deleteConfirmation && (
            <DeleteConfirmation
              title={'¿Eliminar publicación?'}
              onBtnClose={this.handleDeleteConfirmationClose}
              btnContent={'Eliminar'}
              onBtnClick={() => this.onDelete(this.state.publicationToDelete)}
              onLoading={
                this.isArticleEnabled()
                  ? this.props.loadingDeleteArticle
                  : this.props.loadingDeleteEvent
              }
              onError={
                this.isArticleEnabled()
                  ? this.props.errorDeleteArticle
                  : this.props.errorDeleteEvent
              }
            />
          )}
        </PageWrapper>
      </Page>
    )
  }
}

const mapStateToProps = ({ feed, selectedResource }) => {
  return {
    events: mapFeedToNovelty(feed.eventList),
    articles: mapFeedToNovelty(feed.articleList),
    loadingEvents: feed.loadingEvents,
    loadingArticles: feed.loadingArticles,
    hasMoreEvents: feed.hasMoreEvents,
    hasMoreArticles: feed.hasMoreArticles,

    loadingDeleteArticle: feed.loadingDeleteArticle,
    deletedArticle: feed.deletedArticle,
    errorDeleteArticle: feed.errorDeleteArticle,

    loadingDeleteEvent: feed.loadingDeleteEvent,
    deletedEvent: feed.deletedEvent,
    errorDeleteEvent: feed.errorDeleteEvent,

    selectedResource
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchFeedEvent,
      fetchFeedNews,
      setSelectedResource,
      resetSelectedResource,
      deleteArticleById,
      deleteEventById
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
