import React from 'react'
import PetInfo from 'components/PetInfo'
import UserInfoElement from 'components/UserInfoElement'
import UserInfoElementEmpty from 'components/UserInfoElementEmpty'

const UserInfoElementList = ({ emptyMessage, itemList }) =>
  itemList.length ? (
    itemList.map(item => {
      const userData = item.guest_dto ? item.guest_dto : item

      if (userData.relationship === 6) {
        const {
          name,
          age,
          animal_type,
          color,
          pelage_type,
          size,
          gender,
          last_vaccination,
          sterilized
        } = userData

        const pet = {
          name,
          type: animal_type,
          age,
          size,
          color,
          typeCoat: pelage_type,
          gender,
          lastVaccination: last_vaccination,
          sterilized
        }
        return <PetInfo {...pet} />
      }

      return <UserInfoElement user={userData} key={userData.id} />
    })
  ) : (
    <UserInfoElementEmpty message={emptyMessage} />
  )

export default UserInfoElementList
