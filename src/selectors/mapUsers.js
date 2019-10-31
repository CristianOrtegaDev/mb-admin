import { createSelector } from 'reselect'

const mapUsers = createSelector(
  users => users,
  users =>
    users.map(user => ({
      label: `${user.name} ${user.surname}`,
      value: user.username
    }))
)

export default mapUsers
