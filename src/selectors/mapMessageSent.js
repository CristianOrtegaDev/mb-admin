import { createSelector } from 'reselect'
import { getMonthLabel } from 'utils/dateParser'

const mapMessageSent = createSelector(
  enviadosList => enviadosList,
  enviadosList =>
    enviadosList.map(
      (
        { creationusername, creationuserfullname, message, publicationdate, creationuserimageurl },
        i
      ) => ({
        pos: i,
        title: creationuserfullname,
        subtitle: message,
        extraInfo: getMonthLabel(publicationdate),
        userName: creationusername,
        name: creationuserfullname,
        content: message,
        date: publicationdate,
        avatar: creationuserimageurl
      })
    )
)

export default mapMessageSent
