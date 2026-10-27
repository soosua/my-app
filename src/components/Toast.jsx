import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './Toast.css'

export default function Toast({ message, onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return
    const timer = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timer)
  }, [message, duration, onClose])

  return message ? createPortal(<div className="app-toast" role="status">{message}</div>, document.body) : null
}
