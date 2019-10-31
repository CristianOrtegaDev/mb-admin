import { createSelector } from 'reselect'

const mapProprietary = createSelector(
  proprietaryList => proprietaryList,
  proprietaryList =>
    proprietaryList.map(
      ({ id, name, surname, username, dni, phone_number, email, picture_url }, i) => ({
        pos: i,
        id,
        title: `${name} ${surname}`,
        subtitle: `DNI: ${dni}`,
        extraInfo: username,
        avatar: picture_url,
        withAvatar: true,
        username,
        name,
        surname,
        dni,
        phone_number,
        email,
        picture_url
      })
    )
)

export default mapProprietary
