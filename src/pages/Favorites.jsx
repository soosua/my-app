import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/useFavorites'
import ProductCard from '../components/ProductCard'
import BottomNav from '../components/BottomNav'
import './Favorites.css'

export default function Favorites() {
  const { favoriteProducts, toggleFavorite } = useFavorites()

  return (
    <main className="favorites-page">
      <header className="favorites-header">
        <h1>찜한 팩 <span aria-live="polite">{favoriteProducts.length}개</span></h1>
      </header>
      <section className="favorites-content" aria-label="찜한 상품 목록">
        {favoriteProducts.length > 0 ? (
          <div className="product-grid">
            {favoriteProducts.map(product => (
              <ProductCard key={product.id} product={product} liked onToggleLike={toggleFavorite} />
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <Heart size={48} strokeWidth={1.4} aria-hidden="true" />
            <h2>아직 찜한 팩이 없어요</h2>
            <Link to="/home">홈에서 둘러보기</Link>
          </div>
        )}
      </section>
      <BottomNav />
    </main>
  )
}
