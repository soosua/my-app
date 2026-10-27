import { AlarmClock, Check, Eye, Sparkles, TrendingDown, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { useNotifications } from '../context/useNotifications'
import './Notifications.css'

const icons = {
  'price-drop': TrendingDown,
  'closing-soon': AlarmClock,
  'pick-complete': Check,
  viewed: Eye,
  'new-pack': Sparkles,
}

export default function Notifications() {
  const { notifications, markAsRead } = useNotifications()
  const navigate = useNavigate()

  function closeNotifications() {
    // 직접 주소로 접속한 경우에는 돌아갈 앱 화면이 없으므로 홈으로 이동합니다.
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/home', { replace: true })
  }

  return (
    <main className="notifications-page">
      <header className="notifications-header">
        <h1>알림</h1>
        <button type="button" onClick={closeNotifications} aria-label="알림 닫기">
          <X size={22} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </header>
      <ul className="notifications-list" aria-label="알림 목록">
        {notifications.map(notification => {
          const Icon = icons[notification.type] ?? Sparkles
          return (
            <li key={notification.id}>
              <button type="button"
                className={`notification-card${notification.read ? '' : ' notification-card--unread'}`}
                onClick={() => markAsRead(notification.id)}>
                <span className="notification-card__icon"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
                <span className="notification-card__copy">
                  <span className="notification-card__content">{notification.content}</span>
                  <span className="notification-card__time">{notification.time}</span>
                </span>
                <span className="visually-hidden">{notification.read ? '읽음' : '안 읽음'}</span>
                {!notification.read && <span className="notification-card__dot" aria-hidden="true" />}
              </button>
            </li>
          )
        })}
      </ul>
      <BottomNav />
    </main>
  )
}
