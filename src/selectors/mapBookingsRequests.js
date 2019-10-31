import { createSelector } from 'reselect'
import { getFormattedDate } from 'utils/dateParser'

const mapBookingsRequests = createSelector(
  bookingsList => bookingsList,
  bookingsList =>
    bookingsList.map(
      ({ host, space, activity, start_date, end_date, guests, active_time_id, id }, i) => ({
        pos: i,
        title: activity.description,
        subtitle: host.username,
        extraInfo: getFormattedDate(start_date),
        avatar: activity.avatar_url,
        host: host,
        space: space,
        activity: activity,
        start_date: start_date,
        end_date: end_date,
        guests: guests,
        active_time_id: active_time_id,
        id: id,
        withAvatar: true,
        avatarWithPadding: true
      })
    )
)

export default mapBookingsRequests
