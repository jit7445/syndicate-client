import { useBoolean } from '../../utils/hooks/useBoolean'
import HeadsetIcon from '../../icons/Headset/Headset'
import SupportDrawer from '../support-drawer/SupportDrawer'

type FooterProps = {
  style?: React.CSSProperties
}

export default function Footer({ style }: FooterProps) {
  const { value: isSupportOpen, setTrue: openSupport, setFalse: closeSupport } = useBoolean()

  return (
    <footer style={{ backgroundColor: '#F8F6F3', borderTop: '1px solid #E9E4DC', ...style }}>
      <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between text-sm text-text-secondary">
        <span>© {new Date().getFullYear()} Infollion. On demand experts.</span>
        <span className="flex items-center gap-1.5 cursor-pointer hover:text-text-primary" onClick={openSupport}>
          <HeadsetIcon fontSize="small" />
          Support?
        </span>
      </div>

      <SupportDrawer isOpen={isSupportOpen} handleClose={closeSupport} />
    </footer>
  )
}
