import Logo from './Logo'
import './Header.css'

export default function Header() {
  return (
    <header className="onboarding-header">
      <Logo />
      <h1 className="onboarding-header__title">
        마감 직전 럭키백,<br />
        어떻게 시작할까요?
      </h1>
      <p className="onboarding-header__description">이용 유형을 선택해주세요</p>
    </header>
  )
}
