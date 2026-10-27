import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from './BottomNav'
import './ComingSoon.css'

export default function ComingSoon({ title }) {
  const navigate = useNavigate()
  function goBack() {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/my', { replace: true })
  }
  return (
    <main className="coming-soon">
      <header>
        <button type="button" aria-label="뒤로가기" onClick={goBack}><ChevronLeft size={22} aria-hidden="true" /></button>
        <h1>{title}</h1>
      </header>
      <div className="coming-soon__content"><p>준비 중</p></div>
      <BottomNav />
    </main>
  )
}
