export const dayOfTheWeek = day => {
  var dayInLetters = ''
  switch (day !== null) {
    case day === 0:
      dayInLetters = 'Domingo'
      break
    case day === 1:
      dayInLetters = 'Lunes'
      break
    case day === 2:
      dayInLetters = 'Martes'
      break
    case day === 3:
      dayInLetters = 'Miercoles'
      break
    case day === 4:
      dayInLetters = 'Jueves'
      break
    case day === 5:
      dayInLetters = 'Viernes'
      break
    case day === 6:
      dayInLetters = 'Sábado'
      break

    default:
      dayInLetters = day
  }
  return dayInLetters
}
