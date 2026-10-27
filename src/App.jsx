import { useState } from 'react'
import Header from './components/Header'
import RoleCard from './components/RoleCard'
import OnboardingActions from './components/OnboardingActions'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Notifications from './pages/Notifications'
import Explore from './pages/Explore'
import ProductDetail from './pages/ProductDetail'
import My from './pages/My'
import ComingSoon from './components/ComingSoon'
import { myPlaceholderPages } from './data/myPages'
import './App.css'

function Start() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('')

  return (
    <main className="onboarding">
      <Header />
      <fieldset className="role-options">
        <legend className="visually-hidden">이용 유형 선택</legend>
        <RoleCard role="consumer" title="소비자로 시작하기"
          description="내 주변 럭키백을 찾고 픽해요"
          checked={selectedRole === 'consumer'} onChange={setSelectedRole} />
        <RoleCard role="owner" title="사장님으로 시작하기"
          description="마감팩을 등록하고 역경매로 팔아요"
          checked={selectedRole === 'owner'} onChange={setSelectedRole} />
      </fieldset>
      <OnboardingActions canStart={Boolean(selectedRole)} onStart={() => navigate('/home')} />
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/my" element={<My />} />
      {myPlaceholderPages.map(page => <Route key={page.path} path={page.path} element={<ComingSoon title={page.title} />} />)}
    </Routes>
  )
}
