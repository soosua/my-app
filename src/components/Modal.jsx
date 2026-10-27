import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

export default function Modal({ open, title, children, onClose, onConfirm, confirmLabel = '확인', cancelLabel = '취소' }) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    return () => { if (dialog.open) dialog.close() }
  }, [open])

  return createPortal(
    <dialog ref={dialogRef} className="app-modal" aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose() }}>
      <h2 id={titleId}>{title}</h2>
      {children && <div className="app-modal__body">{children}</div>}
      <div className="app-modal__actions">
        {onConfirm && <button type="button" className="app-modal__cancel" onClick={onClose}>{cancelLabel}</button>}
        <button type="button" className="app-modal__confirm" onClick={onConfirm ?? onClose}>{confirmLabel}</button>
      </div>
    </dialog>, document.body,
  )
}
