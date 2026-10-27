import { Bell, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../context/useNotifications'
import logoIcon from '../assets/logo-icon.svg'
import { user } from '../data/user'

export default function HomeHeader() {
  const navigate = useNavigate()
  const { unreadCount } = useNotifications()
  return (
    <header className="home-header">
      <h1 className="home-brand">
        <img src={logoIcon} width="26" height="26" alt="" />
        <span>Re:Pick</span>
      </h1>
      <div className="home-header__tools">
        <span className="home-location"><MapPin size={18} strokeWidth={1.8} aria-hidden="true" />{user.city}</span>
        <button className="home-notifications" type="button" onClick={() => navigate('/notifications')} aria-label={unreadCount > 0 ? `알림, 안 읽은 알림 ${unreadCount}개` : '알림'}>
          <Bell size={22} strokeWidth={1.7} aria-hidden="true" />
          {unreadCount > 0 && <span className="home-notifications__dot" />}
        </button>
      </div>
    </header>
  )
}
