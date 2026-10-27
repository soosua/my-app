import logoIcon from '../assets/logo-icon.svg'
import './Logo.css'

export default function Logo({ size = 24 }) {
  return (
    <span className="brand-logo">
      <img src={logoIcon} width={size} height={size} alt="Re:Pick" />
      <span className="brand-logo__text" aria-hidden="true">Re:Pick</span>
    </span>
  )
}
