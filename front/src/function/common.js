export const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// functions/functions.js //
export const subString = (string, num) => {
  const content = string
  if (content.length > num) {
    const splitContent = content.substring(0, num)
    return splitContent + '...'
  } else {
    return content
  }
}

export const createRandamString = (length) => {
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  var randamString = ''
  for (var i = 0; i < length; i++) {
    randamString += characters[Math.floor(Math.random() * characters.length)]
  }
  return randamString
}

/**
 * Convert datetime into the String.
 */
export const dateToString = (dt) => {
  return dt.getFullYear() + '-' + ('00' + (dt.getMonth() + 1)).slice(-2) + '-' + ('00' + dt.getDate()).slice(-2)
}

/**
 * Convert datetime into the String.
 */
export const getDateString = () => {
  const nowDate = new Date()
  const dateString =
    ('' + nowDate.getFullYear()).slice(-2) +
    ('00' + (nowDate.getMonth() + 1)).slice(-2) +
    ('00' + nowDate.getDate()).slice(-2) +
    ('00' + nowDate.getHours()).slice(-2) +
    ('00' + nowDate.getMinutes()).slice(-2) +
    ('00' + nowDate.getSeconds()).slice(-2)
  return dateString
}

/**
 * Validate input email
 */
export const isValidEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regex.test(email)
}

/**
 * Show an alert if required input is blank
 */
export const isValidRequiredInput = (...args) => {
  let validator = true
  for (let i = 0; i < args.length; i = (i + 1) | 0) {
    if (args[i] === '') {
      validator = false
    }
  }
  return validator
}
