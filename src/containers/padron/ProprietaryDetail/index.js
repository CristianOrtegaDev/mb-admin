import React from 'react'
import { connect } from 'react-redux'
import { DataWrapper, DataContainer } from './styled'
import classNames from 'classnames'
import DetailTitle from 'components/DetailTitle'
import UserInfoElementList from 'components/UserInfoElementList'
import UserInfo from 'components/UserInfo'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import StyledTabs from 'components/StyledTabs'
import { fetchRelatives } from 'store/actions/familiares.actions'
import { fetchGuests } from 'store/actions/invitados.actions'
import EmptyLoader from 'components/PageLoader'
import { withWidth, withStyles } from '@material-ui/core'

const ContentWrapper = styled.div`
  display: flex;
`

export const Wrapper = styled.div`
  width: 100%;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 25px;
  border: 1px solid ${({ theme }) => theme.colors.mercury};
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(37, 38, 94, 0.1);
`

class ProprietaryDetail extends React.Component {
  state = {
    value: 0,
    guestsByUsername: [],
    relativesList: [],
    isLoading: false
  }

  componentDidUpdate = async prevProps => {
    if (!prevProps.item && this.props.item) {
      this.fetchContent(this.props.item)
    } else if (this.isAnotherItem(prevProps)) {
      await this.setState({ guestsByUsername: [], relativesList: [], isLoading: true })
      this.fetchContent(this.props.item)
    }
  }

  isAnotherItem = prevProps => prevProps.item && prevProps.item.id !== this.props.item.id

  fetchContent = selected => {
    this.isGuestsEnabled() ? this.fetchGuests(selected) : this.fetchRelatives(selected)
  }

  fetchGuests = async selected => {
    await this.props.fetchGuests(selected.extraInfo)
    this.setState({
      guestsByUsername: this.props.guestsByUsername,
      isLoading: this.props.loadingGuestsByUsername
    })
  }

  fetchRelatives = async selected => {
    await this.props.fetchRelatives(selected.id)
    this.setState({
      relativesList: this.props.relativesList,
      isLoading: this.props.loadingRelatives
    })
  }

  renderDetail = () => {
    return (
      <ContentWrapper>
        <Wrapper>
          <DetailTitle>{'Información personal:'}</DetailTitle>
          <UserInfo user={this.props.item} />

          <StyledTabs
            value={this.state.value}
            tabs={[
              {
                label: 'Invitado/s',
                value: this.state.guestsByUsername.length
              },
              {
                label: 'Familiares',
                value: this.state.relativesList.length
              }
            ]}
            handleTabChange={this.handleTabChange}
          />
          {this.state.isLoading || this.isLoadingContent(this.props.item) ? (
            <EmptyLoader customHeight={200} />
          ) : (
            <div>
              {this.isGuestsEnabled() ? (
                <UserInfoElementList
                  emptyMessage={'invitados'}
                  itemList={this.state.guestsByUsername}
                />
              ) : (
                <UserInfoElementList
                  emptyMessage={'familiares'}
                  itemList={this.state.relativesList}
                />
              )}
            </div>
          )}
        </Wrapper>
      </ContentWrapper>
    )
  }

  isLoadingContent = () =>
    this.isGuestsEnabled()
      ? this.props.loadingGuestsByUsername && this.props.guestsByUsername.length === 0
      : this.props.loadingRelatives && this.props.relativesList.length === 0

  isGuestsEnabled = () => this.state.value === 0

  handleTabChange = async (event, value) => {
    await this.setState({ value, isLoading: true })
    this.fetchContent(this.props.item)
  }

  renderEmpyDetail = () => (
    <DataWrapper>
      <label>{'Seleccione un Propietario'}</label>
    </DataWrapper>
  )

  render() {
    return (
      <DataContainer className={classNames('portal-hide-scrollbars')}>
        {this.props.item ? this.renderDetail() : this.renderEmpyDetail()}
      </DataContainer>
    )
  }
}

const mapStateToProps = ({ familiares, invitados }) => {
  return {
    relativesList: familiares.relativesList,
    guestsByUsername: invitados.guestsByUsername,
    loadingRelatives: familiares.loadingRelatives,
    loadingGuestsByUsername: invitados.loadingGuestsByUsername
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRelatives,
      fetchGuests
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withWidth(),
    withStyles({ withTheme: true })
  )(ProprietaryDetail)
)
