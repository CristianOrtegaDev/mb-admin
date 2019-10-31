import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { capitalizeFirstLetter } from 'utils/strings'

dayjs.locale('es')

export const getFormattedDate = date => {
  const guestDate = dayjs(date)
  return `${guestDate.format('DD/MM/YY')}`
}

export const getGuestFormattedDate = date => {
  const guestDate = dayjs(date)
  return `${capitalizeFirstLetter(guestDate.format('dddd DD'))} de ${guestDate.format('MMMM')}`
}

export const getMonthLabel = date => {
  const actualDate = dayjs(date)
  return `${actualDate.format('DD')} ${capitalizeFirstLetter(actualDate.format('MMM'))}`
}

export const getExtendedDate = date => {
  const actualDate = dayjs(date)
  return `${actualDate.format('DD')} de ${capitalizeFirstLetter(
    actualDate.format('MMMM')
  )}, ${actualDate.format('YYYY')}, ${actualDate.format('HH:mm')}`
}

export const plus30Minutes = timeSpan => {
  const date = dayjs(`2019-01-01 ${timeSpan}`)
  return date.add(30, 'm').format('HH:mm')
}

export const getReservationsActualDate = () => {
  const date = dayjs()
  return date.format('YYYY-MM-DD')
}
