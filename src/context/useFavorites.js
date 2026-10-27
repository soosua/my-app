import { useContext } from 'react'
import { FavoriteContext } from './favorite-context'

export function useFavorites() {
  const context = useContext(FavoriteContext)
  if (!context) throw new Error('useFavorites must be used within FavoriteProvider')
  return context
}
