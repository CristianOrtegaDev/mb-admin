import { createSelector } from 'reselect'
import { getFormattedDate } from 'utils/dateParser'

const mapNovelty = createSelector(
  feedList => feedList,
  feedList =>
    feedList.map(
      (
        {
          id,
          publicationdate,
          creationusername,
          creationuserimageurl,
          creationuserfullname,
          title,
          subtitle,
          body,
          headerimageurl,
          externalurl,
          boldparagraph,
          newsimagesurls
        },
        i
      ) => ({
        id: id,
        pos: i,
        title: title,
        subtitle: subtitle,
        extraInfo: getFormattedDate(publicationdate),
        body: body,
        headerimageurl: headerimageurl,
        externalurl: externalurl,
        boldparagraph: boldparagraph,
        creationusername: creationusername,
        creationuserfullname: creationuserfullname,
        creationuserimageurl: creationuserimageurl,
        newsimagesurls,
        publicationdate
      })
    )
)

export default mapNovelty
