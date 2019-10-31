import { createSelector } from 'reselect'
import { getMonthLabel } from 'utils/dateParser'

const mapMessageReceived = createSelector(
  recibidosList => recibidosList,
  recibidosList =>
    recibidosList.map(
      (
        {
          objectdto: {
            id,
            creationusername,
            creationuserfullname,
            title,
            message,
            userincidencetypename,
            userincidencecategoryid,
            userincidencecategoryname,
            publicationdate,
            creationuserimageurl,
            picutreurl
          }
        },
        i
      ) => ({
        id,
        pos: i,
        userName: creationusername,
        name: creationuserfullname,
        title: creationuserfullname,
        subtitle: message,
        eventTitle: title,
        type: userincidencetypename,
        categoryId: userincidencecategoryid,
        category: userincidencecategoryname,
        extraInfo: getMonthLabel(publicationdate),
        date: publicationdate,
        avatar: creationuserimageurl,
        pictureUrl: picutreurl
      })
    )
)

export default mapMessageReceived
