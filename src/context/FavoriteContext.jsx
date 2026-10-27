import { useEffect, useState } from 'react'
import { products } from '../data/products'
import { loadFavoriteIds, saveFavoriteIds } from './favoriteStorage'

import { FavoriteContext } from './favorite-context'
const browserStorage = {
  getItem: key => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
}

export function FavoriteProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => loadFavoriteIds(browserStorage, products))

  useEffect(() => {
    saveFavoriteIds(browserStorage, favoriteIds)
  }, [favoriteIds])

  function toggleFavorite(id) {
    if (!products.some(product => product.id === id)) return
    setFavoriteIds(previous => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const favoriteProducts = products.filter(product => favoriteIds.has(product.id))

  return (
    <FavoriteContext.Provider value={{ favoriteIds, favoriteProducts, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  )
}
