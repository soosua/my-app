export function getRemainingSeconds(deadline, now = Date.now()) {
  const end = Date.parse(deadline)
  return Number.isFinite(end) ? Math.max(0, Math.ceil((end - now) / 1000)) : 0
}

export function formatCountdown(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return [hours, minutes, seconds % 60].map(value => String(value).padStart(2, '0')).join(':')
}
