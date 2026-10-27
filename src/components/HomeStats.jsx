import { ShoppingBag, PiggyBank } from 'lucide-react'
import { user } from '../data/user'

export default function HomeStats() {
  return (
    <section className="home-stats" aria-label="나의 리픽 이용 통계">
      <div className="home-stat">
        <span className="home-stat__icon"><ShoppingBag size={18} strokeWidth={1.8} aria-hidden="true" /></span>
        <div><p className="home-stat__label">픽한 팩</p><p className="home-stat__value">{user.stats.pickedPacks.toLocaleString('ko-KR')}개</p></div>
      </div>
      <div className="home-stat">
        <span className="home-stat__icon"><PiggyBank size={18} strokeWidth={1.8} aria-hidden="true" /></span>
        <div><p className="home-stat__label">아낀 금액</p><p className="home-stat__value">{user.stats.savedAmount.toLocaleString('ko-KR')}원</p></div>
      </div>
    </section>
  )
}
