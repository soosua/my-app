import './OnboardingActions.css'

export default function OnboardingActions({ canStart, onStart }) {
  return (
    <div className="onboarding-actions">
      <button className="start-button" type="button" disabled={!canStart} onClick={onStart}>시작하기</button>
      <div className="onboarding-divider"><span>또는</span></div>
      <button className="kakao-button" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11a9 9 0 0 1-12.5 8.3L3 21l1.7-5.5A9 9 0 1 1 21 11Z" />
        </svg>
        카카오로 시작하기
      </button>
    </div>
  )
}
