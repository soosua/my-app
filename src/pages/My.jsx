import { Bell, ChevronRight, CreditCard, Headphones, Heart, ReceiptText, Settings, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { user } from '../data/user'
import { myMenu, profilePage, sellerPage } from '../data/myPages'
import './My.css'

const menuIcons = { receipt: ReceiptText, heart: Heart, bell: Bell, card: CreditCard, headphones: Headphones, settings: Settings }

export default function My() {
  return (
    <main className="my-page">
      <header className="my-header"><h1>마이</h1></header>
      <div className="my-content">
        <section className="my-profile-card" aria-label="나의 프로필과 이용 통계">
          <Link className="my-profile" to={profilePage.path}>
            <span className="my-profile__avatar" aria-hidden="true">{user.name.charAt(0)}</span>
            <span className="my-profile__info"><strong>{user.name}</strong><span>{user.city} · 단골 {user.favoriteStoreCount}곳</span></span>
            <ChevronRight className="my-chevron" size={20} aria-hidden="true" />
          </Link>
          <dl className="my-stats">
            <div><dd>{user.stats.pickedPacks.toLocaleString('ko-KR')}</dd><dt>픽한 팩</dt></div>
            <div><dd>{user.stats.savedAmount.toLocaleString('ko-KR')}원</dd><dt>아낀 금액</dt></div>
          </dl>
        </section>
        <Link className="my-seller" to={sellerPage.path}>
          <span className="my-seller__icon"><Store size={22} strokeWidth={1.6} aria-hidden="true" /></span>
          <span className="my-seller__copy"><strong>우리 가게 마감팩 등록</strong><span>사장님이라면 30초 만에 역경매 시작</span></span>
          <ChevronRight size={20} className="my-chevron" aria-hidden="true" />
        </Link>
        <nav className="my-menu" aria-label="마이 메뉴">
          <ul>
            {myMenu.map(item => {
              const Icon = menuIcons[item.icon]
              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Icon className="my-menu__icon" size={20} strokeWidth={1.6} aria-hidden="true" />
                    <span>{item.title}</span>
                    <ChevronRight className="my-chevron" size={18} aria-hidden="true" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      <BottomNav />
    </main>
  )
}
