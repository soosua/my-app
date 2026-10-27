import './RoleCard.css'

function RoleIcon({ role }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {role === 'consumer' ? <>
        <path d="M3 7h18l-3-4H6L3 7Z" />
        <path d="M3 7v15h18V7M8 11a4 4 0 0 0 8 0" />
      </> : <>
        <path d="m2 7 5-5h10l5 5v3a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-5-2V7ZM2 7h20" />
        <path d="M4 13v9h16v-9M9 22v-5a3 3 0 0 1 6 0v5" />
      </>}
    </svg>
  )
}

export default function RoleCard({ role, title, description, checked, onChange }) {
  return (
    <label className={`role-card${checked ? ' role-card--selected' : ''}`}>
      <input className="role-card__input" type="radio" name="role" value={role}
        checked={checked} onChange={() => onChange(role)} />
      <span className="role-card__icon"><RoleIcon role={role} /></span>
      <span className="role-card__copy">
        <span className="role-card__title">{title}</span>
        <span className="role-card__description">{description}</span>
      </span>
      <span className="role-card__radio" aria-hidden="true" />
    </label>
  )
}
