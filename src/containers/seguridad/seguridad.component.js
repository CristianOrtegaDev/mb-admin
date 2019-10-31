import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import themeStyles from './seguridad.theme.style'
import compose from 'recompose/compose'
import classNames from 'classnames'
import withWidth from '@material-ui/core/withWidth'
import NoSeguridad from './components/no-seguridad/no-seguridad.component'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import NuevoSeguridad from './components/nuevo-seguridad/nuevo-seguridad.component'
import axios from 'axios'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import ResourceList from 'components/ResourceList'
import Page from 'components/Page'
import Section from 'components/Section'
import EmptyWrapper from 'components/PageEmpty'
import EmptyLoader from 'components/PageLoader'
import styled from 'styled-components'
import mapSecurityMembers from 'selectors/mapSecurityMembers'
import PageError from 'components/PageError'
import { setSelectedResource, resetSelectedResource } from 'store/actions/selectedResource'
import { searchSecurityStaff, fetchSecurityStaff } from 'store/actions/securityStaff.actions'
import DetailContainer from 'components/DetailContainer'
import UserInfo from 'components/UserInfo'
import DetailTitle from 'components/DetailTitle'

const PageWrapper = styled.div`
  min-height: 560px;
  width: 100%;
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
  margin-bottom: 20px;
`

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.ghost};
`

const ListWrapper = styled.div`
  width: 40%;
  min-height: 560px;
  background-color: ${({ theme }) => theme.colors.ghost};
  padding-right: 13px;
  max-height: 600px;
  overflow-y: scroll;
  border-bottom-left-radius: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.ghost};
`

const DetailWrapper = styled.div`
  width: 60%;
  min-height: 560px;
  max-height: 600px;
`

class Seguridad extends Component {
  state = {
    selectedMiembroSeguridad: null,
    isNewStaffOpen: false,
    seguridadSelected: '',
    seguridadSearched: null
  }

  componentDidMount() {
    this.props.fetchSecurityStaff()
    this.props.resetSelectedResource()
  }

  selectedMiembroSeguridad = user => () => {
    this.setState({ selectedMiembroSeguridad: user })
  }

  onOpenNuevoSeguridad = () => {
    this.setState({ isNewStaffOpen: true })
  }

  onCloseNuevoSeguridad = reset => {
    if (reset) this.props.fetchSecurityStaff()
    this.setState({ isNewStaffOpen: false })
  }

  showSelectedSeguridad = seguridad => {
    this.setState({ seguridadSelected: seguridad })
  }

  searchHandler = (value, filter) => {
    if (filter === null || filter === undefined) {
      filter = 'name'
    }
    this.props.searchSecurityStaff(filter, value)
  }

  renderMainView = () => {
    const { classes } = this.props
    return !this.state.isNewStaffOpen && !this.props.error ? (
      <Wrapper>
        <Section
          title={'Administrar Personal de Seguridad'}
          btnContent={'Añadir Personal'}
          onBtnClick={this.onOpenNuevoSeguridad}
        >
          <Grid container className={classes.gridContainerMain}>
            {/* TODO --> Uncomment this SearchComponent when the search service is fixed */}
            {/* <SearchComponent
            searchHandler={(event, filter) => this.searchHandler(event.target.value, filter)}
          /> */}
            {this.isLoading() ? <EmptyLoader /> : this.renderPageContent()}
          </Grid>
        </Section>
      </Wrapper>
    ) : (
      <PageError onReload={() => this.props.fetchSecurityStaff()} />
    )
  }

  isLoading = () => this.props.loading

  isContentAvaiable = () => !this.props.loading && this.props.seguridadList.length > 0

  renderPageContent = () =>
    this.isContentAvaiable() ? (
      <ContentWrapper>
        {this.renderList()}
        {this.renderDetail()}
      </ContentWrapper>
    ) : (
      <EmptyWrapper message={'No hay personal ingresado en la plataforma'} />
    )

  renderList = () => (
    <ListWrapper id={'scrollContainer'} className={classNames('portal-hide-scrollbars')}>
      <ResourceList
        elements={this.props.mappedSecurityMembers}
        onClick={this.handleResourceClick}
        selectedPos={this.props.selectedResource ? this.props.selectedResource.pos : null}
        noMoreContentMsg={'No hay mas personal'}
        hasMore={false}
      />
    </ListWrapper>
  )

  renderDetail = () => (
    <DetailWrapper>
      {this.props.selectedResource ? (
        <DetailContainer>
          <DetailTitle>{'Detalle del empleado'}</DetailTitle>
          <UserInfo user={this.props.selectedResource} />
        </DetailContainer>
      ) : (
        <NoSeguridad />
      )}
    </DetailWrapper>
  )

  handleResourceClick = resource => this.props.setSelectedResource(resource)

  render() {
    return (
      <Page>
        <PageWrapper>
          {this.state.isNewStaffOpen ? (
            <NuevoSeguridad
              onHandleClose={this.onCloseNuevoSeguridad}
              data={this.state.seguridadSelected}
            />
          ) : (
            this.renderMainView()
          )}
        </PageWrapper>
      </Page>
    )
  }
}

const mapStateToProps = state => {
  return {
    mappedSecurityMembers: mapSecurityMembers(state.securityStaff.staffList),
    seguridadList: state.securityStaff.staffList,
    loading: state.securityStaff.loading,
    error: state.securityStaff.error,
    selectedResource: state.selectedResource
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSelectedResource,
      resetSelectedResource,
      searchSecurityStaff,
      fetchSecurityStaff
    },
    dispatch
  )

Seguridad.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withWidth(),
    withStyles(themeStyles, { withTheme: true })
  )(withErrorHandler(Seguridad, axios))
)
