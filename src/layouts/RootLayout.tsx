import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="bg-layout-background">
      <Outlet />
    </div>
  )
}
