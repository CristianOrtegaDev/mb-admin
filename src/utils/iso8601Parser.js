export const parseToISO = date => {
  var tzoffset = new Date().getTimezoneOffset() * 60000
  var dateISO = new Date(date - tzoffset).toISOString().slice(0, -1)
  return dateISO
}
