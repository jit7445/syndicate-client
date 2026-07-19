import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import { useIsMobile } from '../../utils/hooks/useIsMobile'
import SupportForm from './form'

type SupportDrawerProps = {
  isOpen: boolean
  handleClose: () => void
}

export default function SupportDrawer({ isOpen, handleClose }: SupportDrawerProps) {
  const isMobile = useIsMobile()

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleClose}>
      <Box sx={{ width: isMobile ? '100vw' : 480, position: 'relative', p: 4 }}>
        <CloseIcon sx={{ position: 'absolute', top: 16, right: 16, cursor: 'pointer' }} onClick={handleClose} />

        <h2 className="text-2xl font-bold text-text-primary">Still have a question?</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Tell us what you're looking for and we'll get back to you within one business day.
        </p>

        <div className="mt-6">
          <SupportForm handleSubmitClose={handleClose} />
        </div>

        <p className="mt-4 text-center text-sm text-text-secondary">
          Prefer email? Reach us directly at{' '}
          <a href="mailto:hello@infollion.com" className="font-semibold text-accent-2">
            hello@infollion.com
          </a>
        </p>
      </Box>
    </Drawer>
  )
}
