import logoIcon from '../assets/logo-icon.svg'
import './Header.css'

export default function Header() {
  return (
    <header className="onboarding-header">
      <span className="onboarding-header__logo" aria-label="리픽">
        <img src={logoIcon} width="24" height="24" alt="" />
        <span>Re:Pick</span>
      </span>
      <h1 className="onboarding-header__title">
        마감 직전 럭키백,<br />
        어떻게 시작할까요?
      </h1>
      <p className="onboarding-header__description">이용 유형을 선택해주세요</p>
    </header>
  )
}
