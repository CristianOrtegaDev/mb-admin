import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSpaces } from 'store/actions/spaces.actions'
import Select from 'react-select'
import mapSpaces from 'selectors/mapSpaces'
import { Container, StyledLabel, Row, SelectWrapper, ActionLabel, TableWrapper } from './styled'
import ReservationsTable from 'components/ReservationsTable'
import { fetchActiveTimes } from 'store/actions/activeTimes.actions'
import { getReservationsActualDate } from 'utils/dateParser'
import PageLoader from 'components/PageLoader'

class ActivityDetail extends React.Component {
  state = {
    selectedSpace: null,
    edit: false
  }

  componentDidMount = () => {
    this.props.fetchSpaces(this.props.selectedResource.id)
  }

  componentDidUpdate = prevProps => {
    if (this.props.selectedResource.id !== prevProps.selectedResource.id) {
      this.props.fetchSpaces(this.props.selectedResource.id)
      this.setState({ selectedSpace: null })
    }
  }

  toggleMode = () => this.setState({ edit: !this.state.edit })

  handleSpaceSelection = option => {
    const actualDate = getReservationsActualDate()
    this.props.fetchActiveTimes(option.value.id, actualDate)
    this.setState({ selectedSpace: option })
  }

  render() {
    return (
      <Container>
        <StyledLabel>{'Espacios'}</StyledLabel>
        <Row>
          <SelectWrapper>
            <Select
              value={this.state.selectedSpace}
              onChange={this.handleSpaceSelection}
              options={this.props.formattedSpaces}
              placeholder="Seleccione un espacio..."
              isLoading={this.props.spaces.isFetching}
              isDisabled={this.props.spaces.isFetching}
              autoFocus
            />
          </SelectWrapper>
          <Row
            justify={
              !this.props.activeTimes.isFetching && this.state.selectedSpace
                ? 'space-between'
                : 'flex-end'
            }
          >
            {!this.props.activeTimes.isFetching && this.state.selectedSpace && (
              <ActionLabel
                onClick={() =>
                  this.props.onEdit(this.props.activeTimes.values, this.state.selectedSpace.value)
                }
              >
                {'Editar espacio'}
              </ActionLabel>
            )}
            <ActionLabel onClick={this.props.onCreate}>{'Agregar espacio'}</ActionLabel>
          </Row>
        </Row>
        <TableWrapper>
          {this.props.activeTimes.isFetching ? (
            <PageLoader customHeight={400} />
          ) : this.state.selectedSpace ? (
            <ReservationsTable data={this.props.activeTimes.values} />
          ) : (
            <label>{'Seleccione un espacio'}</label>
          )}
        </TableWrapper>
      </Container>
    )
  }
}

const mapStateToProps = ({ selectedResource, activeTimes, spaces }) => ({
  selectedResource,
  formattedSpaces: mapSpaces(spaces.values),
  activeTimes,
  spaces
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSpaces, fetchActiveTimes }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityDetail)
