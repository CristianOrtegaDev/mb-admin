import { createSelector } from 'reselect'
import { getFormattedDate } from 'utils/dateParser'

const mapFilteredGuests = createSelector(
  filteredGuests => filteredGuests,
  filteredGuests =>
    filteredGuests.map(
      (
        {
          host_username,
          username_name_owner,
          username_telephone_owner,
          date_from,
          date_to,
          name,
          dni,
          telephone,
          car,
          avatar
        },
        i
      ) => ({
        pos: i,
        // Host data
        title: name,
        subtitle: dni ? `DNI: ${dni}` : '',
        extraInfo: getFormattedDate(date_to),
        host_full_name: username_name_owner,
        host_username,
        host_phone_number: username_telephone_owner,
        from: date_from,
        to: date_to,
        // Guest data
        userName: '',
        name,
        dni,
        content: dni ? `DNI: ${dni}` : '',
        date: date_from,
        phone_number: telephone,
        vehicle: car,
        avatar
      })
    )
)

export default mapFilteredGuests
