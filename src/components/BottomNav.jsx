import { Compass, Heart, House, UserRound } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import './BottomNav.css'

export default function BottomNav() {
  const { pathname } = useLocation()
  const isHomeSection = pathname === '/notifications'
  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      <NavLink to="/home" className={({ isActive }) => `bottom-nav__item${isActive || isHomeSection ? ' bottom-nav__item--active' : ''}`}>
        <House aria-hidden="true" /><span>홈</span>
      </NavLink>
      <NavLink to="/explore" className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}>
        <Compass aria-hidden="true" /><span>탐색</span>
      </NavLink>
      <NavLink to="/favorites" className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}>
        <Heart aria-hidden="true" /><span>찜</span>
      </NavLink>
      <NavLink to="/my" className={({ isActive }) => `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}>
        <UserRound aria-hidden="true" /><span>마이</span>
      </NavLink>
    </nav>
  )
}
