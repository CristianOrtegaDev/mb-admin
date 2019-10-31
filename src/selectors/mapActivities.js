import { createSelector } from 'reselect'

const mapActivities = createSelector(
  activitiesList => activitiesList,
  activitiesList =>
    activitiesList.map(({ avatar_url, description, id }, i) => ({
      pos: i,
      title: description,
      subtitle: '',
      extraInfo: '',
      avatar: avatar_url,
      avatar_url,
      description,
      id: id,
      withAvatar: true,
      avatarWithPadding: true
    }))
)

export default mapActivities
