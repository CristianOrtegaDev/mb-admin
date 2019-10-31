export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const dateDiffInSeconds = (dt2, dt1) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000
  return Math.abs(Math.round(diff))
}

export const capitalizeFirstLetter = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`

export const checkValidity = (value, rules) => {
  let isValid = true
  if (!rules) {
    return true
  }

  if (rules.required) {
    if (Number.isInteger(value)) {
      isValid = value > -1 && isValid
    } else {
      isValid = value.trim() !== '' && isValid
    }
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/
    isValid = pattern.test(value) && isValid
  }

  if (rules.isPhone) {
    const pattern = /^\+?[1-9]\d{6,14}$/
    isValid = pattern.test(value) && isValid
  }

  return isValid
}
