export const NOTIFICATIONS_STORAGE_KEY = 'repick.read-notifications.v1'

export function loadReadIds(storage, notifications) {
  const validIds = new Set(notifications.map(item => item.id))
  const defaults = notifications.filter(item => item.read).map(item => item.id)
  try {
    const saved = storage.getItem(NOTIFICATIONS_STORAGE_KEY)
    if (saved !== null) {
      const ids = JSON.parse(saved)
      if (Array.isArray(ids)) return new Set([...defaults, ...ids.filter(id => validIds.has(id))])
    }
  } catch {
    // 저장 공간 접근 실패나 손상된 데이터는 기본 읽음 상태로 복구합니다.
  }
  return new Set(defaults)
}

export function saveReadIds(storage, ids) {
  try {
    storage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    // 저장이 제한되어도 현재 세션에서는 읽음 처리가 가능합니다.
  }
}
