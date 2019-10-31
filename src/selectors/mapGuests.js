import { createSelector } from 'reselect'
import { getFormattedDate } from 'utils/dateParser'

const mapGuests = createSelector(
  guests => guests,
  guests => {
    let index = 0
    return guests.reduce(
      (guestsList, { host_full_name, host_username, host_phone_number, from, to, invitations }) => {
        invitations.forEach(
          ({ guest: { username, full_name, dni, profile_picture_url, phone_number, vehicle } }) => {
            guestsList.push({
              pos: index,
              // Host data,
              title: full_name || username,
              subtitle: dni ? `DNI: ${dni}` : '',
              extraInfo: getFormattedDate(to),
              host_full_name,
              host_username,
              host_phone_number,
              from,
              to,
              // Guest data
              userName: username,
              name: full_name,
              dni,
              date: to,
              phone_number,
              vehicle,
              avatar: profile_picture_url
            })
            index++
          }
        )
        return guestsList
      },
      []
    )
  }
)

export default mapGuests
