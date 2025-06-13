// Validates if input is a valid number (including float)
export const isValidNumber = (value: string): boolean => {
  if (value === '') return true // Allow empty string
  if (value === '.') return true // Allow single dot for starting decimal

  // Check if it's a valid float number
  const floatRegex = /^\d*\.?\d*$/
  return floatRegex.test(value)
}

// Formats number input to prevent invalid entries
export const formatNumberInput = (value: string): string => {
  // Remove any non-numeric characters except decimal point
  let formatted = value.replace(/[^0-9.]/g, '')

  // Ensure only one decimal point
  const parts = formatted.split('.')
  if (parts.length > 2) {
    formatted = parts[0] + '.' + parts.slice(1).join('')
  }

  // Remove leading zeros except when followed by decimal
  if (formatted.length > 1 && formatted[0] === '0' && formatted[1] !== '.') {
    formatted = formatted.substring(1)
  }

  return formatted
}

// Validates if amount is greater than 0
export const isValidAmount = (amount: string): boolean => {
  const num = parseFloat(amount)
  return !isNaN(num) && num > 0
}

// Formats display amount with proper decimal places
export const formatDisplayAmount = (amount: string | number, decimals: number = 6): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '0'

  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}
