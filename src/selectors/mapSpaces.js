import { createSelector } from 'reselect'

const mapSpaces = createSelector(
  spaces => spaces,
  spaces =>
    spaces.map(space => ({
      label: space.description,
      value: space
    }))
)

export default mapSpaces
