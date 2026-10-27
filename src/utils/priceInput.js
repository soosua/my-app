export function normalizePriceInput(value) {
  return value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '').slice(0, 12)
}

export function formatPriceInput(digits) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function isAboveCurrentPrice(digits, currentPrice) {
  return digits !== '' && Number(digits) > currentPrice
}
