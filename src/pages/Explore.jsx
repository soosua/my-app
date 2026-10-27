import { useState } from 'react'
import { Apple, Coffee, Croissant, Salad, Search, Soup, Utensils } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import ProductListItem from '../components/ProductListItem'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { filterProducts } from '../utils/filterProducts'
import './Explore.css'

const categoryIcons = { apple: Apple, coffee: Coffee, croissant: Croissant, salad: Salad, soup: Soup, utensils: Utensils }

export default function Explore() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const visibleProducts = filterProducts(products, query, category)

  return (
    <main className="explore-page">
      <header className="explore-header">
        <h1>탐색</h1>
        <div className="explore-search">
          <Search size={20} strokeWidth={1.7} aria-hidden="true" />
          <input type="search" aria-label="가게나 메뉴 검색" placeholder="가게나 메뉴를 검색해보세요"
            value={query} onChange={event => setQuery(event.target.value)} />
        </div>
      </header>
      <div className="explore-content">
        <section aria-labelledby="explore-categories-title">
          <h2 id="explore-categories-title" className="explore-categories-title">카테고리</h2>
          <div className="explore-categories">
            {categories.map(item => {
              const Icon = categoryIcons[item.icon]
              return (
                <button type="button" key={item.id} aria-pressed={category === item.name}
                  className={`explore-category${category === item.name ? ' explore-category--selected' : ''}`}
                  onClick={() => setCategory(previous => previous === item.name ? '' : item.name)}>
                  <Icon size={25} strokeWidth={1.4} aria-hidden="true" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        </section>
        <section className="explore-results" aria-labelledby="explore-results-title">
          <div className="explore-results__header">
            <h2 id="explore-results-title">전체 럭키백</h2>
            <span aria-live="polite">{visibleProducts.length}개</span>
          </div>
          {visibleProducts.length > 0 ? (
            <div className="explore-product-list">
              {visibleProducts.map(product => <ProductListItem key={product.id} product={product} />)}
            </div>
          ) : <p className="explore-empty" role="status">검색 결과가 없어요</p>}
        </section>
      </div>
      <BottomNav />
    </main>
  )
}
