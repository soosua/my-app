export const FAVORITES_STORAGE_KEY = 'repick.favorites.v1'

export function loadFavoriteIds(storage, products) {
  const validIds = new Set(products.map(product => product.id))
  try {
    const saved = storage.getItem(FAVORITES_STORAGE_KEY)
    if (saved !== null) {
      const ids = JSON.parse(saved)
      if (Array.isArray(ids)) return new Set(ids.filter(id => validIds.has(id)))
    }
  } catch {
    // 저장 공간 접근이 막혔거나 데이터가 손상되면 기본 목록을 사용합니다.
  }
  return new Set(products.filter(product => product.initiallyLiked).map(product => product.id))
}

export function saveFavoriteIds(storage, ids) {
  try {
    storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    // 저장이 불가능해도 현재 화면의 찜 기능은 계속 사용할 수 있습니다.
  }
}
