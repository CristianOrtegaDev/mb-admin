import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Page from 'components/Page'
import Section from 'components/Section'
import themeStyles from './personas.theme.style'
import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import PropTypes from 'prop-types'
import axios from 'axios'
import classNames from 'classnames'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import ProprietaryCreator from './ProprietaryCreator/index'
import ProprietaryDetail from './ProprietaryDetail/index'
import { bindActionCreators } from 'redux'
import { fetchPadron, searchPadron } from 'store/actions/padron.actions'
import styled from 'styled-components'
import PageLoader from 'components/PageLoader'
import mapProprietary from 'selectors/mapProprietary'
import ResourceList from 'components/ResourceList'
import { setSelectedResource, resetSelectedResource } from 'store/actions/selectedResource'
import EmptyWrapper from 'components/PageEmpty'

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 560px;
`

const ContentWrapper = styled.div`
  display: flex;
`

const ListWrapper = styled.div`
  width: 35%;
  min-height: 560px;
  background-color: ${({ theme }) => theme.colors.ghost};
  padding-right: 13px;
  max-height: 600px;
  overflow-y: scroll;
  border-bottom-left-radius: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.ghost};
`

class Personas extends Component {
  state = {
    isNewPropietarioOpen: false,
    isPropietarioDetalleOpen: false,
    itemInDetail: ''
  }

  componentDidMount() {
    this.props.fetchPadron()
    this.props.resetSelectedResource()
  }

  searchHandler = value => {
    this.props.searchPadron(value)
  }

  openDeleteConfirmation = item => {
    this.setState({ openDeleteConfirmation: true, propietarioToDelete: item })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  onOpenPropietarioDetalle = item => {
    this.setState({ isPropietarioDetalleOpen: true, itemInDetail: item })
  }

  onClosePropietarioDetalle = () => {
    this.setState({ isPropietarioDetalleOpen: false })
  }

  onOpenNewPropietario = () => {
    this.setState({ isNewPropietarioOpen: true })
  }

  onCloseNewProprietary = reload => {
    if (reload) {
      this.props.fetchPadron(true)
      this.props.resetSelectedResource()
    }
    this.setState({ isNewPropietarioOpen: false })
  }

  isLoadingContent = () => this.props.loading && this.props.guests.length === 0

  createMainView = () => (
    <Section
      title={'Administrar Padron'}
      btnContent={'Añadir Propietario'}
      onBtnClick={this.onOpenNewPropietario}
    >
      <Wrapper>{this.isLoadingContent() ? <PageLoader /> : this.renderPageContent()}</Wrapper>
    </Section>
  )

  isContentAvaiable = () => !this.props.loading && this.props.mappedPropietaries.length > 0

  renderPageContent = () =>
    this.isContentAvaiable() ? (
      <ContentWrapper>
        <ListWrapper id={'scrollContainer'} className={classNames('portal-hide-scrollbars')}>
          <ResourceList
            elements={this.props.mappedPropietaries}
            onClick={this.handleResourceClick}
            selectedPos={this.props.selectedResource ? this.props.selectedResource.pos : null}
            fetchMoreContent={() => this.props.fetchPadron()}
            noMoreContentMsg={'No hay mas familiares'}
            hasMore={this.props.hasMore}
          />
        </ListWrapper>

        <ProprietaryDetail
          onHandleClose={this.onClosePropietarioDetalle}
          item={this.props.selectedResource}
        />
      </ContentWrapper>
    ) : (
      <EmptyWrapper message={'No hay familiares disponibles'} />
    )

  handleResourceClick = resource => this.props.setSelectedResource(resource)

  isLoadingContent = () => this.props.loading

  render() {
    return (
      <Page className={classNames('portal-hide-scrollbars')}>
        <PageWrapper>
          {this.createMainView()}
          {this.state.isNewPropietarioOpen && (
            <ProprietaryCreator onClose={this.onCloseNewProprietary} />
          )}
        </PageWrapper>
      </Page>
    )
  }
}

const mapStateToProps = ({ padron, selectedResource }) => {
  return {
    mappedPropietaries: mapProprietary(padron.proprietaryList),
    itemSearched: padron.proprietaryList,
    loading: padron.loading,
    hasMore: padron.hasMore,
    selectedResource
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPadron,
      searchPadron,
      setSelectedResource,
      resetSelectedResource
    },
    dispatch
  )

Personas.propTypes = {
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
  )(withErrorHandler(Personas, axios))
)
