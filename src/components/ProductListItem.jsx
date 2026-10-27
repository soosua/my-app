import { Apple, CakeSlice, Coffee, Croissant, MapPin, Salad, Soup, Utensils } from 'lucide-react'
import { Link } from 'react-router-dom'
import './ProductListItem.css'

const foodIcons = { apple: Apple, cake: CakeSlice, coffee: Coffee, croissant: Croissant, salad: Salad, soup: Soup, utensils: Utensils }

export default function ProductListItem({ product }) {
  const Icon = foodIcons[product.foodIcon] ?? Utensils
  return (
    <article className="product-list-item">
      <div className="product-list-item__image"><Icon size={28} strokeWidth={1.3} aria-hidden="true" /></div>
      <div className="product-list-item__details">
        <div className="product-list-item__tags">
          <span>블라인드 팩</span><span>{product.discountPercent}% OFF</span>
        </div>
        <h3><Link to={`/products/${product.id}`}>{product.storeName}</Link></h3>
        <p className="product-list-item__prices">
          <s><span className="visually-hidden">원래 가격 </span>{product.originalPrice.toLocaleString('ko-KR')}원</s>
          <strong><span className="visually-hidden">할인 가격 </span>{product.price.toLocaleString('ko-KR')}원</strong>
        </p>
        <p className="product-list-item__location"><MapPin size={13} aria-hidden="true" />도보 {product.walkMinutes}분 · 남은 {product.remainingPacks}개</p>
      </div>
    </article>
  )
}
