import { plus30Minutes } from 'utils/dateParser'

export const generateReservationsTableRows = reservations => {
  const completedColumnDays = fillReservationsDays(reservations)
  const completedRowDays = reservationsColumnsToRows(completedColumnDays)
  return completedRowDays
}

const fillReservationsDays = reservations =>
  reservations.map(reservation => ({
    ...reservation,
    active_times: completeDay(reservation.active_times.sort((a, b) => (a.from > b.from ? 1 : -1)))
  }))

const completeDay = active_times => {
  const initialTimeSpan = '00:00'
  const lastTimeSpan = '23:30'

  let actualTimeSpan = active_times.length > 0 ? active_times[0].from : lastTimeSpan

  let formattedReservations = []
  formattedReservations = completeTimeRange(initialTimeSpan, actualTimeSpan)

  active_times.forEach(reservation => {
    if (actualTimeSpan < reservation.from) {
      formattedReservations = [
        ...formattedReservations,
        ...completeTimeRange(actualTimeSpan, reservation.from)
      ]
      actualTimeSpan = reservation.from
    }

    formattedReservations = [
      ...formattedReservations,
      ...completeTimeRange(actualTimeSpan, reservation.to, reservation)
    ]

    actualTimeSpan = reservation.to
  })

  formattedReservations = [
    ...formattedReservations,
    ...completeTimeRange(actualTimeSpan, lastTimeSpan)
  ]

  return formattedReservations
}

const completeTimeRange = (from, to, reservationData) => {
  let timesCompleted = []

  let lastTimeSpan = from

  let index = 0

  while (lastTimeSpan < to) {
    let updatedTimeSpan = plus30Minutes(lastTimeSpan)

    let timeSpan = generateTimeRange(lastTimeSpan, updatedTimeSpan, reservationData, index)

    timesCompleted.push(timeSpan)

    lastTimeSpan = updatedTimeSpan

    index = index + 1
  }

  if (reservationData && timesCompleted.length) {
    timesCompleted[timesCompleted.length - 1].final = true
  }

  return timesCompleted
}

const generateTimeRange = (lastTimeSpan, updatedTimeSpan, reservationData, pos) => {
  let timeRange = {
    from: lastTimeSpan,
    to: updatedTimeSpan
  }

  if (reservationData) {
    if (pos === 0) {
      timeRange.initial = true
    }
    timeRange.id = reservationData.id
    timeRange.space_id = reservationData.space_id
    timeRange.is_cancelled = reservationData.is_cancelled
    timeRange.is_booked = reservationData.is_booked
    timeRange.booking = reservationData.booking
    timeRange.price = reservationData.price
    timeRange.originalData = reservationData
  }

  return timeRange
}

const reservationsColumnsToRows = columnDays => {
  let rowTimeSlots = {}
  columnDays.forEach(day => {
    day.active_times.forEach(timeSlot => {
      if (!rowTimeSlots[timeSlot.from]) {
        rowTimeSlots[timeSlot.from] = {
          rowLabel: timeSlot.from
        }
      }
      rowTimeSlots[timeSlot.from][day.day_of_week] = timeSlot
    })
  })
  return rowTimeSlots
}

export const addTimeRange = (timeRange, dayPos, originalData) => {
  let updatedData = Array.from(originalData)
  let isDateValid = false
  updatedData.forEach(day => {
    if (day.day_of_week === dayPos) {
      //Check first range
      if (!day.active_times.length) {
        day.active_times.push(timeRange)
        isDateValid = true
      } else {
        //Check middle range
        let ActiveTimesUpdated = []

        day.active_times.forEach((range, i) => {
          const prevRange = day.active_times[i - 1] || { to: '00:00' }

          if (prevRange.to <= timeRange.from && range.from >= timeRange.to) {
            ActiveTimesUpdated.push(timeRange)
            isDateValid = true
          }

          ActiveTimesUpdated.push(range)
        })

        //Check latest range
        if (!isDateValid) {
          const lastRange = day.active_times[day.active_times.length - 1]
          if (lastRange.to <= timeRange.from && '23:30' >= timeRange.to) {
            ActiveTimesUpdated.push(timeRange)
            isDateValid = true
          }
        }

        day.active_times = ActiveTimesUpdated
      }
    }
  })
  return updatedData
}

export const isTimeRangeValid = (timeRange, dayPos, originalData) => {
  const dataCopy = Array.from(originalData)
  let isDateValid = false
  dataCopy.forEach(day => {
    if (day.day_of_week === dayPos) {
      //Check first range
      if (!day.active_times.length) {
        isDateValid = true
      } else {
        //Check middle range
        day.active_times.forEach((range, i) => {
          const prevRange = day.active_times[i - 1] || { to: '00:00' }

          if (prevRange.to <= timeRange.from && range.from >= timeRange.to) {
            isDateValid = true
          }
        })
        //Check latest range
        if (!isDateValid) {
          const lastRange = day.active_times[day.active_times.length - 1]
          if (lastRange.to <= timeRange.from && '23:30' >= timeRange.to) {
            isDateValid = true
          }
        }
      }
    }
  })

  return isDateValid
}
