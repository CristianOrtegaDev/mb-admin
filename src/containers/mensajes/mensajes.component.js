import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMsjEnviados, fetchMsjRecibidos, fetchMsjUnread } from 'store/actions/mensajes.actions'
import { setSelectedMessage, resetSelectedMessage } from 'store/actions/selectedMessage'
import Page from 'components/Page'
import Section from 'components/Section'
import compose from 'recompose/compose'
import classNames from 'classnames'
import themeStyles from './mensajes.theme.style'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import styled from 'styled-components'
import mapMessageReceived from 'selectors/mapMessageReceived'
import mapMessageSent from 'selectors/mapMessageSent'
import mapMessageUnread from 'selectors/mapMessageUnread'
import MessageDetail from './MessageDetail'
import StyledTabs from 'components/StyledTabs'
import MessageCreator from './MessageCreator'
import EmptyWrapper from 'components/PageEmpty'
import EmptyLoader from 'components/PageLoader'
import ResourceList from 'components/ResourceList'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 600px;
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 600px;
`

const ListWrapper = styled.div`
  width: 35%;
  background-color: ${({ theme }) => theme.colors.ghost};
  padding-right: 13px;
  max-height: 600px;
  overflow-y: scroll;
  border-bottom-left-radius: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.ghost};
`
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

class Mensajes extends React.Component {
  state = {
    messageCreator: false,
    msjData: '',
    value: 0
  }

  componentDidMount = () => {
    if (
      this.props.recibidosList.length === 0 ||
      this.props.enviadosList.length === 0 ||
      this.props.unreadList.length === 0
    ) {
      this.fetchContent()
    }
    this.props.resetSelectedMessage()
  }

  fetchContent = reset => {
    this.props.fetchMsjEnviados(reset)
    this.props.fetchMsjRecibidos(reset)
    this.props.fetchMsjUnread(reset)
  }

  renderPageContent = () => (
    <Section
      title={'Bandeja de entrada'}
      btnContent={'Nuevo mensaje'}
      onBtnClick={() => this.openMessageCreator('')}
    >
      <Wrapper>
        <StyledTabs
          value={this.state.value}
          tabs={[
            { label: 'No leídos', value: this.props.unreadList.length },
            { label: 'Recibidos', value: this.props.recibidosList.length },
            { label: 'Enviados', value: this.props.enviadosList.length }
          ]}
          handleTabChange={this.handleTabChange}
        />
        {this.isLoadingContent() ? <EmptyLoader /> : this.renderMessagesContent()}
      </Wrapper>
    </Section>
  )

  isLoadingContent = () =>
    this.isUnreadEnabled()
      ? this.props.loadingUnread && this.props.unreadList.length === 0
      : this.isReceivedEnabled()
      ? this.props.loadingRecibidos && this.props.recibidosList.length === 0
      : this.props.loadingEnviados && this.props.enviadosList.length === 0

  renderMessagesContent = () =>
    this.isContentAvaiable() ? (
      <ContentWrapper>
        <ListWrapper id={'scrollContainer'} className={classNames('portal-hide-scrollbars')}>
          <ResourceList
            elements={
              this.isUnreadEnabled()
                ? this.props.unreadList
                : this.isReceivedEnabled()
                ? this.props.recibidosList
                : this.props.enviadosList
            }
            onClick={this.handleUserClick}
            selectedPos={this.props.selectedMessage ? this.props.selectedMessage.pos : null}
            noMoreContentMsg={'No hay mas mensajes disponibles'}
            fetchMoreContent={() =>
              this.isUnreadEnabled()
                ? this.props.fetchMsjUnread()
                : this.isReceivedEnabled()
                ? this.props.fetchMsjRecibidos()
                : this.props.fetchMsjEnviados()
            }
            hasMore={
              this.isUnreadEnabled()
                ? this.props.messages.hasMoreUnread
                : this.isReceivedEnabled()
                ? this.props.messages.hasMoreReceived
                : this.props.messages.hasMoreSent
            }
          />
        </ListWrapper>
        <MessageDetail
          message={this.props.selectedMessage}
          onResponseClick={pos =>
            this.openMessageCreator(
              this.isUnreadEnabled()
                ? this.props.unreadRow[pos]
                : this.props.recibidoRaw[pos].objectdto
            )
          }
          hasResponse={this.isUnreadEnabled() ? this.isUnreadEnabled() : this.isReceivedEnabled()}
        />
      </ContentWrapper>
    ) : (
      <EmptyWrapper message={'No hay mensajes disponibles'} withMargin />
    )

  isContentAvaiable = () =>
    this.isUnreadEnabled()
      ? this.props.unreadList.length > 0
      : this.isReceivedEnabled()
      ? this.props.recibidosList.length > 0
      : this.props.enviadosList.length > 0

  handleUserClick = message => this.props.setSelectedMessage(message)

  isUnreadEnabled = () => this.state.value === 0

  isReceivedEnabled = () => this.state.value === 1

  handleTabChange = (event, value) => {
    this.props.resetSelectedMessage()
    this.setState({ value })
  }

  handleNewMessageClose = reloadContent => {
    if (reloadContent) this.fetchContent(true)
    this.closeMessageCreator()
  }

  openMessageCreator = msjData =>
    this.setState({
      messageCreator: true,
      msjData: { label: msjData.creationuserfullname, value: msjData.creationusername }
    })

  closeMessageCreator = () => this.setState({ messageCreator: false, msjData: '' })

  render() {
    return (
      <Page>
        <PageWrapper>
          {this.renderPageContent()}
          {this.state.messageCreator && (
            <MessageCreator user={this.state.msjData} onClose={this.handleNewMessageClose} />
          )}
        </PageWrapper>
      </Page>
    )
  }
}

const mapStateToProps = ({
  messages,
  messages: {
    recibidosList,
    loadingRecibidos,
    enviadosList,
    loadingEnviados,
    loadingUnread,
    unreadList
  },
  selectedMessage
}) => ({
  messages,
  recibidoRaw: recibidosList,
  recibidosList: mapMessageReceived(recibidosList),
  loadingRecibidos,
  enviadosList: mapMessageSent(enviadosList),
  loadingEnviados,
  selectedMessage,
  unreadRow: unreadList,
  unreadList: mapMessageUnread(unreadList),
  loadingUnread
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMsjEnviados,
      fetchMsjRecibidos,
      fetchMsjUnread,
      setSelectedMessage,
      resetSelectedMessage
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withWidth(),
    withStyles(themeStyles, { withTheme: true })
  )(Mensajes)
)
