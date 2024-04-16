/**
 * Render a date in a human-readable format
 * @param date
 * @returns {string}
 */

export const renderDate = (date: string): string => {
  const dateObject = new Date(date)
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1
  const day = dateObject.getDate()
  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()
  const seconds = dateObject.getSeconds()
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

export const renderDOB = (date: string): string => {
  const dateObject = new Date(date)
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')
  return `${day}/${month}/${year}`
}

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
