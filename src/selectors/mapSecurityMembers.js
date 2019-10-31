import { createSelector } from 'reselect'

const mapSecurityMembers = createSelector(
  securityMembers => securityMembers,
  securityMembers =>
    securityMembers.map(
      (
        {
          id,
          name,
          family_name,
          username,
          dni,
          phone_number,
          email,
          profile_picture,
          neighbourhoodname
        },
        i
      ) => ({
        pos: i,
        id,
        title: `${name} ${family_name}`,
        subtitle: `DNI: ${dni} Barrio: ${neighbourhoodname}`,
        avatar: profile_picture,
        name,
        family_name,
        username,
        dni,
        phone_number,
        email,
        profile_picture,
        neighbourhoodname,
        withAvatar: true,
        avatarCentered: true
      })
    )
)

export default mapSecurityMembers
