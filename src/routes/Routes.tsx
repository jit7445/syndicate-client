import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import Home from '../modules/home/Home'
import TranscriptsList from '../modules/transcripts/pages/TranscriptsList'
import TranscriptDetail from '../modules/transcripts/pages/TranscriptDetail'
import Cart from '../modules/cart/Cart'
import Checkout from '../modules/checkout/Checkout'
import Profile from '../modules/profile/Profile'
import RequireAuth from '../components/require-auth/RequireAuth'
import ErrorPage from '../modules/error-page/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'transcripts', element: <TranscriptsList /> },
      { path: 'transcripts/:id', element: <TranscriptDetail /> },
      { path: 'cart', element: <Cart /> },
      {
        path: 'checkout',
        element: (
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        ),
      },
      {
        path: 'profile',
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
    ],
  },
])

export default router
