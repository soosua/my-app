import { useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import CategoryTabs from '../components/CategoryTabs'
import HomeStats from '../components/HomeStats'
import { AlarmClock, ChevronRight, Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import BottomNav from '../components/BottomNav'
import { useFavorites } from '../context/useFavorites'
import './Home.css'

export default function Home() {
  const [category, setCategory] = useState('전체')
  const { favoriteIds, toggleFavorite } = useFavorites()
  const visibleProducts = products.filter(product => category === '전체' || product.category === category)

  return (
    <main className="home-page" aria-label="리픽 홈">
      <HomeHeader />
      <div className="home-search">
        <Search size={20} strokeWidth={1.7} aria-hidden="true" />
        <input type="search" aria-label="럭키백 검색"
          placeholder="오늘 어떤 럭키백을 픽할까요?" />
      </div>
      <CategoryTabs selected={category} onSelect={setCategory} />
      <HomeStats />
      <section className="closing-soon" aria-labelledby="closing-soon-title">
        <div className="closing-soon__header">
          <div>
            <h2 id="closing-soon-title"><AlarmClock size={18} strokeWidth={1.6} aria-hidden="true" />마감 임박</h2>
            <p>곧 가격이 떨어지는 럭키백이에요</p>
          </div>
          <button type="button" className="closing-soon__all" onClick={() => setCategory('전체')}>
            전체보기<ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="product-grid">
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} liked={favoriteIds.has(product.id)} onToggleLike={toggleFavorite} />
          ))}
        </div>
      </section>
      <BottomNav />
    </main>
  )
}
