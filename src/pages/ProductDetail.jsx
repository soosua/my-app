import { useCallback, useEffect, useState } from 'react'
import { Apple, Bell, ChevronLeft, ChevronRight, Clock3, Coffee, Croissant, Eye, Heart, Salad, Share2, Soup, Star, Utensils } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { categories } from '../data/categories'
import { useFavorites } from '../context/useFavorites'
import { formatCountdown, getRemainingSeconds } from '../utils/countdown'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import { normalizePriceInput, formatPriceInput, isAboveCurrentPrice } from '../utils/priceInput'
import './ProductDetail.css'

const categoryIcons = { apple: Apple, coffee: Coffee, croissant: Croissant, salad: Salad, soup: Soup, utensils: Utensils }
const money = value => value.toLocaleString('ko-KR')

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(item => item.id === id)
  return product ? <DetailContent key={product.id} product={product} /> : (
    <main className="product-not-found">
      <h1>상품을 찾을 수 없어요</h1>
      <Link to="/home">홈으로 돌아가기</Link>
    </main>
  )
}

function DetailContent({ product }) {
  const navigate = useNavigate()
  const { favoriteIds, toggleFavorite } = useFavorites()
  const [now, setNow] = useState(Date.now)
  const [targetPrice, setTargetPrice] = useState('')
  const [toast, setToast] = useState(null)
  const [modal, setModal] = useState(null)
  const [hintRevealed, setHintRevealed] = useState(false)
  const targetPriceInvalid = isAboveCurrentPrice(targetPrice, product.price)
  const dismissToast = useCallback(() => setToast(null), [])

  function showToast(message) {
    setToast(previous => ({ message, key: (previous?.key ?? 0) + 1 }))
  }
  const seconds = getRemainingSeconds(product.deadline, now)
  const liked = favoriteIds.has(product.id)
  const category = categories.find(item => item.name === product.category)
  const Icon = categoryIcons[category?.icon] ?? Utensils

  useEffect(() => {
    window.scrollTo(0, 0)
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  function goBack() {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/home', { replace: true })
  }

  async function shareProduct() {
    const data = { title: `${product.storeName} | Re:Pick`, url: window.location.href }
    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      try {
        await navigator.share(data)
        return
      } catch (error) {
        if (error.name === 'AbortError') return
        // 기기 공유가 불가능하면 링크 복사로 이어집니다.
      }
    }
    try {
      await navigator.clipboard.writeText(data.url)
      showToast('링크가 복사됐어요')
    } catch {
      showToast('링크를 복사하지 못했어요. 주소창에서 복사해주세요')
    }
  }

  function purchaseProduct() {
    // 마지막 타이머 갱신 이후 마감됐을 수도 있으므로 클릭 순간 다시 확인합니다.
    if (getRemainingSeconds(product.deadline) === 0) {
      setNow(Date.now())
      return
    }
    setModal('purchase')
  }

  return (
    <main className="product-detail">
      <section className="detail-hero" aria-labelledby="product-detail-title">
        <div className="detail-toolbar">
          <button className="detail-back" type="button" aria-label="뒤로가기" onClick={goBack}><ChevronLeft size={24} aria-hidden="true" /></button>
          <div className="detail-toolbar__right">
            <button type="button" aria-label="상품 찜" aria-pressed={liked} className={liked ? 'detail-liked' : ''} onClick={() => toggleFavorite(product.id)}>
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
            </button>
            <button type="button" aria-label="상품 공유" onClick={shareProduct}><Share2 size={19} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="detail-hero__icon"><Icon size={58} strokeWidth={1.3} aria-hidden="true" /></div>
        <p className="detail-hero__label">BLIND PACK</p>
        <h1 id="product-detail-title">{product.storeName}</h1>
      </section>
      <div className="detail-sheet">
        <div className="detail-store">
          <span className="detail-store__avatar" aria-hidden="true">{product.storeName.charAt(0)}</span>
          <div><h2>{product.storeName}</h2><p><Star size={12} fill="currentColor" aria-hidden="true" />{product.rating.toFixed(1)} · 도보 {product.walkMinutes}분</p></div>
          <ChevronRight size={18} className="detail-chevron" aria-hidden="true" />
        </div>
        <div className="detail-deadline"><span><Clock3 size={16} aria-hidden="true" />마감까지</span><strong role="timer" aria-label="마감까지 남은 시간">{seconds > 0 ? formatCountdown(seconds) : '마감됐어요'}</strong></div>
        <section className="detail-price" aria-label="상품 가격">
          <div><s>{money(product.originalPrice)}원</s><span>{product.discountPercent}% OFF</span></div>
          <p className="detail-price__amount">{money(product.price)}원</p>
          <p className="detail-price__drop">{product.priceDropIntervalMinutes}분마다 {money(product.priceDropAmount)}원씩 하락</p>
        </section>
        <button className="detail-hint" type="button" onClick={() => setModal(hintRevealed ? 'hint-result' : 'hint-confirm')}>
          <span className="detail-hint__icon"><Eye size={20} aria-hidden="true" /></span>
          <span className="detail-hint__copy"><strong>{hintRevealed ? '힌트 다시 보기' : `${money(product.hintPrice)}원으로 힌트 보기`}</strong><span>럭키백에 무엇이 담겼는지 살짝 확인해요</span></span>
          <span className="detail-hint__viewers"><Eye size={12} aria-hidden="true" />{product.hintViewerCount}명</span>
          <ChevronRight size={16} className="detail-chevron" aria-hidden="true" />
        </button>
        <div className="detail-target">
          <label htmlFor="target-price"><Bell size={18} aria-hidden="true" />희망가 알림</label>
          <div><span aria-hidden="true">₩</span><input id="target-price" type="text" inputMode="numeric" aria-label="희망 가격 (원)" placeholder="희망 가격" value={formatPriceInput(targetPrice)} aria-invalid={targetPriceInvalid} aria-describedby={targetPriceInvalid ? 'target-price-error' : undefined} onChange={event => setTargetPrice(normalizePriceInput(event.target.value))} /></div>
        </div>
        {targetPriceInvalid && <p id="target-price-error" className="detail-target-error" role="status">현재 가격보다 낮게 입력해주세요</p>}
        {hintRevealed && <p className="detail-revealed-hint"><Eye size={16} aria-hidden="true" />{product.hint}</p>}
      </div>
      <footer className="detail-purchase">
        <button type="button" disabled={seconds === 0} onClick={purchaseProduct}>{seconds > 0 ? `지금 ${money(product.price)}원에 구매하기` : '마감됐어요'}</button>
        <p>블라인드 팩 특성상 교환/환불이 어려울 수 있습니다</p>
      </footer>
      <Modal open={modal === 'hint-confirm'} title={`${money(product.hintPrice)}원을 내고 힌트를 볼까요?`}
        onClose={() => setModal(null)} onConfirm={() => { setHintRevealed(true); setModal('hint-result') }}>
        <p>실제 결제 없이 힌트를 확인할 수 있어요.</p>
      </Modal>
      <Modal open={modal === 'hint-result'} title="럭키백 힌트" onClose={() => setModal(null)}>
        <p>{product.hint}</p>
      </Modal>
      <Modal open={modal === 'purchase'} title="구매가 완료됐어요" onClose={() => setModal(null)}>
        <p>{product.storeName} 팩을 픽했어요. 실제 결제는 이루어지지 않았어요.</p>
      </Modal>
      {toast && <Toast key={toast.key} message={toast.message} onClose={dismissToast} />}
    </main>
  )
}
