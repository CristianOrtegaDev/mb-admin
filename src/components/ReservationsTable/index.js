import React from 'react'
import weekDays from 'constants/weekDays'
import Table from 'components/Table'
import Calendar from 'assets/icons/calendar.png'
import TableCell from './TableCell'
import { generateReservationsTableRows, addTimeRange } from 'utils/timeFormatter'
import styled from 'styled-components'

const HeaderCell = styled.div`
  height: 35px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme, white }) =>
    white ? theme.colors.white : theme.colors.dustyGrayTransparent};
  border-left: 1px solid ${({ theme }) => theme.colors.mystic};
  outline: none;
`

const CalendarImage = styled.img`
  width: 25px;
`

class ReservationsTable extends React.Component {
  state = {
    reservationDataFormatted: {}
  }
  componentDidMount = () => {
    this.generateReservationsDataFormatted(this.props.data)
  }

  generateReservationsDataFormatted = data => {
    if (this.props.edit) {
      this.props.onChange(data)
    }
    let reservationDataFormatted = generateReservationsTableRows(data)
    this.setState({
      reservationDataFormatted
    })
  }

  createRange = (timeRange, dayPos) => {
    const updatedData = addTimeRange(timeRange, dayPos, this.props.data)
    this.generateReservationsDataFormatted(updatedData)
  }

  updateRange = (timeRange, dayPos) => {
    let updatedData = [...this.props.data]
    updatedData.forEach(day => {
      if (day.day_of_week === dayPos) {
        let updatedTimes = []
        day.active_times.forEach(range => {
          if (range.from !== timeRange.from) {
            updatedTimes.push(range)
          } else {
            updatedTimes.push(timeRange)
          }
        })
        day.active_times = updatedTimes
      }
    })
    this.generateReservationsDataFormatted(updatedData)
  }

  deleteRange = (timeRange, dayPos) => {
    let updatedData = [...this.props.data]
    updatedData.forEach(day => {
      if (day.day_of_week === dayPos) {
        let updatedTimes = []
        day.active_times.forEach(range => {
          if (range.from !== timeRange.from) {
            updatedTimes.push(range)
          }
        })
        day.active_times = updatedTimes
      }
    })
    if (timeRange.id) {
      this.props.onDeleteRange(timeRange.id)
    }
    this.generateReservationsDataFormatted(updatedData)
  }

  generateColumns = () => {
    const firstColumn = {
      Header: (
        <HeaderCell white>
          <CalendarImage src={Calendar} />
        </HeaderCell>
      ),
      accessor: 'rowLabel',
      Cell: props => <TableCell>{props.value}</TableCell>
    }

    const dayColumns = this.props.data.map((day, pos) => ({
      Header: <HeaderCell>{weekDays[day.day_of_week]}</HeaderCell>,
      accessor: `${day.day_of_week}`,
      Cell: props => (
        <TableCell
          dayPos={day.day_of_week}
          data={this.props.data}
          timeRange={props.value}
          isBooked={props.value.is_booked}
          isCancelled={props.value.is_cancelled}
          booking={props.value.booking}
          price={props.value.price}
          edit={this.props.edit}
          initial={props.value.initial}
          final={props.value.final}
          originalData={props.value.originalData}
          onRangeDelete={dayRange => this.deleteRange(dayRange, day.day_of_week)}
          onRangeCreation={dayRange => this.createRange(dayRange, day.day_of_week)}
          onRangeChange={dayRange => this.updateRange(dayRange, day.day_of_week)}
          leftPopUp={pos > 3}
        />
      )
    }))

    return [firstColumn, ...dayColumns]
  }

  render() {
    const generatedColumns = this.generateColumns()
    return (
      <Table data={Object.values(this.state.reservationDataFormatted)} columns={generatedColumns} />
    )
  }
}

export default ReservationsTable
