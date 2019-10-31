import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page from 'components/Page'
import Section from 'components/Section'
import EmptyLoader from 'components/PageLoader'
import EmptyWrapper from 'components/PageEmpty'
import ActivitiesList from './ActivitiesList'
import { fetchActivities } from 'store/actions/activities.actions'
import { setSelectedResource, resetSelectedResource } from 'store/actions/selectedResource'
import QuestionIcon from 'assets/icons/info.png'
import ActivityDetail from './ActivityDetail'
import NewActivity from './NewActivity'
import NewSpace from './NewSpace'
import { Wrapper, ActivitiesContainer, StyledTitle, DetailContainer } from './styled'

class Reservations extends React.Component {
  state = {
    newActivity: false,
    newSpace: false,
    spaceToEdit: undefined,
    spaceData: undefined
  }

  componentDidMount = () => {
    this.props.resetSelectedResource()
    this.fetchContent()
  }

  fetchContent = () => {
    this.props.fetchActivities()
  }

  isLoading = () => this.props.activities.isFetching

  isContentAvaiable = () => this.props.activities.values && this.props.activities.values.length > 0

  checkPageContent = () =>
    this.isContentAvaiable() ? (
      this.renderPageContent()
    ) : (
      <EmptyWrapper message={'No hay actividades disponibles'} />
    )

  renderPageContent = () => (
    <Wrapper>
      {this.renderActivities()}
      {this.renderDetail()}
    </Wrapper>
  )

  renderActivities = () => (
    <ActivitiesContainer>
      <StyledTitle>{'Tipo de actividades'}</StyledTitle>
      <ActivitiesList
        activities={this.props.activities.values}
        selected={this.props.selectedResource}
        onActivityClick={activity => this.props.setSelectedResource(activity)}
      />
    </ActivitiesContainer>
  )

  renderDetail = () => (
    <DetailContainer>
      {this.props.selectedResource ? (
        <ActivityDetail
          onCreate={() => this.toggleNewSpaceForm(undefined)}
          onEdit={this.toggleNewSpaceForm}
        />
      ) : (
        <EmptyWrapper message={'Seleccione una actividad'} icon={QuestionIcon} />
      )}
    </DetailContainer>
  )

  handleFormClose = reset => {
    if (reset) this.fetchContent()
    this.toggleNewActivityForm()
  }

  toggleNewActivityForm = () => this.setState({ newActivity: !this.state.newActivity })

  handleSpaceClose = reset => {
    if (reset) this.fetchContent()
    this.toggleNewSpaceForm()
  }

  toggleNewSpaceForm = (spaceToEdit, spaceData) =>
    this.setState({ newSpace: !this.state.newSpace, spaceToEdit, spaceData })

  render() {
    return (
      <Page>
        <Section
          title={'Administrar Reservas'}
          btnContent={'Nueva actividad'}
          onBtnClick={this.toggleNewActivityForm}
        >
          {this.isLoading() ? <EmptyLoader /> : this.checkPageContent()}
        </Section>
        {this.state.newActivity && <NewActivity onClose={this.handleFormClose} />}
        {this.state.newSpace && (
          <NewSpace
            space={this.state.spaceToEdit}
            spaceData={this.state.spaceData}
            onClose={this.handleSpaceClose}
          />
        )}
      </Page>
    )
  }
}

const mapStateToProps = ({ activities, selectedResource }) => ({
  activities,
  selectedResource
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchActivities,
      setSelectedResource,
      resetSelectedResource
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reservations)
