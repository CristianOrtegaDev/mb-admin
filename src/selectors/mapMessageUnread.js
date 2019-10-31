import { createSelector } from 'reselect'
import { getMonthLabel } from 'utils/dateParser'

const mapMessageUnread = createSelector(
  unreadList => unreadList,
  unreadList =>
    unreadList.map(
      (
        {
          creationusername,
          creationuserfullname,
          title,
          message,
          userincidencetypename,
          userincidencecategoryname,
          publicationdate,
          creationuserimageurl,
          picutreurl
        },
        i
      ) => ({
        pos: i,
        title: creationuserfullname,
        subtitle: message,
        extraInfo: getMonthLabel(publicationdate),
        userName: creationusername,
        name: creationuserfullname,
        eventTitle: title,
        type: userincidencetypename,
        category: userincidencecategoryname,
        date: publicationdate,
        avatar: creationuserimageurl,
        pictureUrl: picutreurl
      })
    )
)

export default mapMessageUnread
