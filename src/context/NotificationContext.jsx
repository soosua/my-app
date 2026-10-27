import { useEffect, useState } from 'react'
import { notifications as notificationData } from '../data/notifications'
import { NotificationContext } from './notification-context'
import { loadReadIds, saveReadIds } from './notificationStorage'

const browserStorage = {
  getItem: key => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
}

export function NotificationProvider({ children }) {
  const [readIds, setReadIds] = useState(() => loadReadIds(browserStorage, notificationData))

  useEffect(() => {
    saveReadIds(browserStorage, readIds)
  }, [readIds])

  function markAsRead(id) {
    if (!notificationData.some(item => item.id === id)) return
    setReadIds(previous => previous.has(id) ? previous : new Set([...previous, id]))
  }

  const notifications = notificationData.map(item => ({ ...item, read: readIds.has(item.id) }))
  const unreadCount = notifications.filter(item => !item.read).length

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  )
}
