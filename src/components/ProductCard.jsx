import { CakeSlice, Clock3, Croissant, Eye, Heart, Salad, Utensils } from 'lucide-react'
import { Link } from 'react-router-dom'
import './ProductCard.css'

const foodIcons = { croissant: Croissant, salad: Salad, cake: CakeSlice, utensils: Utensils }
const formatNumber = (value) => value.toLocaleString('ko-KR')

export default function ProductCard({ product, liked, onToggleLike }) {
  const FoodIcon = foodIcons[product.foodIcon] ?? Utensils
  const lowStock = product.remainingPacks <= 2

  return (
    <article className="product-card" aria-labelledby={`product-${product.id}`}>
      <div className="product-card__tags">
        <span className="product-card__tag">블라인드 팩</span>
        <span className="product-card__tag product-card__tag--discount">{product.discountPercent}% OFF</span>
      </div>
      <div className="product-card__image">
        <FoodIcon size={28} strokeWidth={1.3} aria-hidden="true" />
        <button type="button" className={`product-card__heart${liked ? ' product-card__heart--liked' : ''}`}
          aria-label={`${product.storeName} 찜`} aria-pressed={liked}
          onClick={event => { event.stopPropagation(); onToggleLike(product.id) }}>
          <Heart size={17} strokeWidth={1.8} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>
      <p className="product-card__viewers"><Eye size={12} aria-hidden="true" />
        {product.activityText ?? (product.viewerCount == null ? '누군가 엿봤어요' : `${product.viewerCount}명이 보는 중`)}
      </p>
      <h3 id={`product-${product.id}`} className="product-card__name"><Link className="product-card__link" to={`/products/${product.id}`}>{product.storeName}</Link></h3>
      <p className="product-card__original"><span className="visually-hidden">원래 가격 </span><s>{formatNumber(product.originalPrice)}원</s></p>
      <p className="product-card__price"><span className="visually-hidden">할인 가격 </span>{formatNumber(product.price)}원</p>
      <p className="product-card__drop"><Clock3 size={12} aria-hidden="true" />
        <span>{product.priceDropMinutes}분 후 {formatNumber(product.priceDropAmount)}원 하락</span>
      </p>
      <p className={`product-card__stock${lowStock ? ' product-card__stock--low' : ''}`}>
        <span className="product-card__stock-dot" aria-hidden="true" />남은 팩 {product.remainingPacks}개
      </p>
    </article>
  )
}
