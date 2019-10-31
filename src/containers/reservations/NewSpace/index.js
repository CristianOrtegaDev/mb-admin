import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'components/Modal'
import CrossIcon from 'assets/icons/cross.png'
import CircularProgress from '@material-ui/core/CircularProgress'
import Input from 'components/Input'
import ReservationsTable from 'components/ReservationsTable'
import weekDays from 'constants/weekDays'
import { submitSpace, editSpace, deleteSpace } from 'store/actions/spaces.actions'
import {
  Container,
  CrossImage,
  Row,
  Column,
  StyledButton,
  StyledLabel,
  ActionLabel,
  TableWrapper,
  ErrorLabel
} from './styled'

class NewSpace extends React.Component {
  state = {
    name: '',
    nameError: '',
    tableValues: undefined,
    remove_ids: []
  }

  componentDidMount = () => {
    if (!this.isEditMode()) {
      this.generateEmptyTableValues()
    } else {
      const tableValues = JSON.parse(JSON.stringify([...this.props.space]))
      this.setState({
        tableValues,
        name: this.isEditMode() ? this.props.spaceData.description : ''
      })
    }
  }

  generateEmptyTableValues = () => {
    const tableValues = Object.keys(weekDays).map(key => ({
      day_of_week: parseInt(key),
      active_times: []
    }))
    this.setState({ tableValues })
  }

  isEditMode = () => this.props.space

  checkButtonContent = () =>
    this.props.spaces.isSubmitting ? (
      <CircularProgress size={18} />
    ) : this.isEditMode() ? (
      'Actualizar'
    ) : (
      'Crear'
    )

  checkData = () => {
    if (!this.hasErrors()) {
      if (!this.isEditMode()) {
        this.handleSpaceCreation()
      } else {
        this.handleSpaceEdit()
      }
    }
  }

  handleSpaceCreation = async () => {
    const filteredValues = this.state.tableValues.reduce(
      (timesArray, { day_of_week, active_times }) => {
        active_times.forEach(({ from, to, price }) =>
          timesArray.push({
            day_of_week,
            from,
            to,
            price
          })
        )
        return timesArray
      },
      []
    )

    await this.props.submitSpace(
      this.props.selectedResource.id,
      this.state.name.replace(/\s/g, ''),
      filteredValues
    )
    this.checkSpaceSubmitError()
  }

  handleSpaceEdit = async () => {
    const filteredValues = this.state.tableValues.reduce(
      (timesArray, { day_of_week, active_times }) => {
        active_times.forEach(({ id, from, to, price, booking }) => {
          const newActiveTime = {
            day_of_week,
            from,
            to,
            price: parseInt(price)
          }

          if (id) {
            newActiveTime.id = id
          }

          if (booking) {
            newActiveTime.booking = booking
            newActiveTime.is_booked = true
          }

          timesArray.push(newActiveTime)
        })
        return timesArray
      },
      []
    )
    await this.props.editSpace(this.props.spaceData.id, filteredValues, this.state.remove_ids)
    this.checkSpaceSubmitError()
  }

  checkSpaceSubmitError = () => {
    if (!this.props.spaces.error) {
      this.props.onClose(true)
    }
  }

  hasErrors = () => {
    let hasError = false
    if (this.state.name === '') {
      this.setState({ nameError: 'Ingrese un nombre' })
      return (hasError = true)
    }
    return hasError
  }

  handleSpaceDelele = async () => {
    await this.props.deleteSpace(this.props.spaceData.id)
    this.checkSpaceSubmitError()
  }

  render() {
    return (
      <Modal>
        <Container>
          <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
          <Row>
            <Column>
              <StyledLabel>{'Nombre'}</StyledLabel>
              <Input
                value={this.state.name}
                error={this.state.nameError}
                onChange={({ target: value }) =>
                  this.setState({ name: value.value, nameError: null })
                }
                placeholder={'Ingrese el nombre del espacio'}
                disabled={this.isEditMode()}
              />
              {this.state.nameError && <ErrorLabel>{this.state.nameError}</ErrorLabel>}
            </Column>
          </Row>
          <TableWrapper>
            {this.state.tableValues && (
              <ReservationsTable
                data={this.state.tableValues}
                onChange={tableValues =>
                  this.setState({
                    tableValues
                  })
                }
                onDeleteRange={rangeId =>
                  this.setState({ remove_ids: [...this.state.remove_ids, rangeId] })
                }
                edit
              />
            )}
          </TableWrapper>
          <Row margin={'20px 0 0 0'} justify={this.isEditMode() ? 'space-between' : 'flex-end'}>
            {this.isEditMode() && (
              <ActionLabel
                onClick={!this.props.spaces.isSubmitting && this.handleSpaceDelele}
                disabled={false}
                error
              >
                {'Eliminar espacio'}
              </ActionLabel>
            )}
            <StyledButton onClick={this.checkData} disabled={this.props.spaces.isSubmitting}>
              {this.checkButtonContent()}
            </StyledButton>
          </Row>
          {this.props.spaces.error && <ErrorLabel>{this.props.spaces.error}</ErrorLabel>}
        </Container>
      </Modal>
    )
  }
}

const mapStateToProps = ({ selectedResource, spaces }) => ({
  selectedResource,
  spaces
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitSpace, editSpace, deleteSpace }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSpace)
