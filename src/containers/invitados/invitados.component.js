import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import compose from 'recompose/compose'
import Page from 'components/Page'
import Section from 'components/Section'
import ResourceList from 'components/ResourceList'
import SearchBar from 'components/SearchBar'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import themeStyles from './invitados.theme.style'
import { fetchInvitaciones, fetchFilteredGuests } from 'store/actions/invitados.actions'
import { setSelectedGuest } from 'store/actions/selectedGuest'
import GuestDetail from './GuestDetail'
import mapGuests from 'selectors/mapGuests'
import mapFilteredGuests from 'selectors/mapFilteredGuests'
import styled from 'styled-components'
import classNames from 'classnames'
import EmptyWrapper from 'components/PageEmpty'
import EmptyLoader from 'components/PageLoader'

const PageWrapper = styled.div`
  overflow: hidden;
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
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 560px;
`

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.alto};
  margin-right: 1px;
  border-radius: 10px;
`

const ContentWrapper = styled.div`
  display: flex;
  margin-right: 1px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.alto};
`

const ListWrapper = styled.div`
  width: 35%;
  background-color: ${({ theme }) => theme.colors.ghost};
  padding-right: 13px;
  max-height: 600px;
  min-height: 550px;
  overflow-y: scroll;
  border-bottom-left-radius: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.ghost};
`

class Invitados extends React.Component {
  state = {
    filter: ''
  }

  componentDidMount = () => {
    this.props.fetchInvitaciones()
  }

  renderPageContent = () => (
    <SearchWrapper>
      <SearchBar
        placeholder={'Busca por: lote'}
        value={this.state.filter}
        onChange={this.handleInputOnChange}
        onClear={this.handleInputClear}
        onKeyDown={this.handleKeyPress}
        borderBottom
      />
      <ContentWrapper>
        <ListWrapper id={'scrollContainer'} className={classNames('portal-hide-scrollbars')}>
          {this.isContentAvaiable() ? (
            <ResourceList
              elements={this.isFilterEnabled() ? this.props.filteredGuests : this.props.guests}
              onClick={this.handleGuestClick}
              selectedPos={this.props.selectedGuest ? this.props.selectedGuest.pos : null}
              fetchMoreContent={() => this.props.fetchInvitaciones()}
              noMoreContentMsg={'No hay mas invitados'}
              hasMore={this.isFilterEnabled() ? this.props.loading : this.props.hasMore}
            />
          ) : (
            <EmptyWrapper message={'No hay invitados disponibles'} />
          )}
        </ListWrapper>
        <GuestDetail guest={this.props.selectedGuest} />
      </ContentWrapper>
    </SearchWrapper>
  )

  isFilterEnabled = () => this.state.filterEnabled

  handleInputOnChange = value => this.setState({ filter: value })

  handleInputClear = value => {
    this.props.setSelectedGuest(null)
    this.setState({ filter: value, filterEnabled: false })
  }

  handleKeyPress = e => {
    if (e.keyCode == 13 && e.target.value !== '') {
      this.props.setSelectedGuest(null)
      this.props.fetchFilteredGuests(e.target.value)
      this.setState({ filterEnabled: true })
    }
  }

  handleGuestClick = guest => this.props.setSelectedGuest(guest)

  isContentAvaiable = () => this.props.guests.length > 0 || this.props.filteredGuests.length > 0

  isLoadingContent = () => this.props.loading && this.props.guests.length === 0

  render() {
    return (
      <Page>
        <PageWrapper>
          <Section title={'Administrar invitados'}>
            <Wrapper>
              {this.isLoadingContent() ? <EmptyLoader /> : this.renderPageContent()}
            </Wrapper>
          </Section>
        </PageWrapper>
      </Page>
    )
  }
}

const mapStateToProps = ({
  invitados: { invitadosList, filteredGuests, loading, hasMore },
  selectedGuest
}) => ({
  guests: mapGuests(invitadosList),
  filteredGuests: mapFilteredGuests(filteredGuests),
  loading,
  hasMore,
  selectedGuest
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchInvitaciones, setSelectedGuest, fetchFilteredGuests }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withWidth(),
    withStyles(themeStyles, { withTheme: true })
  )(Invitados)
)
