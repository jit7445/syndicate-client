import { useState } from 'react'
import DialogModal from '../../../../components/dialog/DialogModal'
import AuthForm from './form'
import type { AuthDialogMode } from '../../types'

type AuthDialogProps = {
  isOpen: boolean
  handleClose: () => void
  initialMode?: AuthDialogMode
  onSuccess: () => void
}

export default function AuthDialog({ isOpen, handleClose, initialMode = 'signin', onSuccess }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthDialogMode>(initialMode)

  const handleSubmitClose = () => {
    setMode(initialMode)
    onSuccess()
    handleClose()
  }

  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={mode === 'signin' ? 'Sign in' : 'Register'}
    >
      <AuthForm mode={mode} setMode={setMode} handleClose={handleClose} handleSubmitClose={handleSubmitClose} />
    </DialogModal>
  )
}
