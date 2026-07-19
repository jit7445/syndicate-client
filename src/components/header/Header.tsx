import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { APP_ROUTES } from '../../constants/appRoutes'
import AuthDialog from '../../modules/auth/components/auth-dialog'
import AccountMenu from './AccountMenu'
import SearchBar from '../searchbar/SearchBar'
import { useBoolean } from '../../utils/hooks/useBoolean'
import { isLoggedIn } from '../../utils/authUtils'
import { getStorageItem } from '../../utils/storageUtils'
import { useCart } from '../../modules/cart/hooks/useCart'
import type { AuthDialogMode } from '../../modules/auth/types'

type HeaderProps = {
  isSearch?: boolean
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  onSearch?: (value: string) => void
  isExtraComponent?: boolean
  component?: ReactNode
}

export default function Header({
  isSearch = false,
  searchPlaceholder = '',
  searchValue = '',
  onSearchChange,
  onSearch,
  isExtraComponent = false,
  component,
}: HeaderProps) {
  const { value: isAuthOpen, setTrue: openAuth, setFalse: closeAuth } = useBoolean()
  const [authMode, setAuthMode] = useState<AuthDialogMode>('signin')
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  const userName = getStorageItem<string>('userName')
  const { items: cartItems } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()

  const openSignIn = () => {
    setAuthMode('signin')
    openAuth()
  }

  const openRegister = () => {
    setAuthMode('register')
    openAuth()
  }

  useEffect(() => {
    if (searchParams.get('authRequired') && !isLoggedIn()) {
      openSignIn()
      searchParams.delete('authRequired')
      setSearchParams(searchParams, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <header className="bg-header-background border-b border-gray-100">
      <div className="flex items-center justify-between gap-6 px-6 py-3">
        <Link to={APP_ROUTES.home} className="flex shrink-0 items-center">
          <img src="/assets/infollion_logo_200x100.png" alt="Infollion" className="h-12 w-auto" />
        </Link>

        {isSearch && (
          <div className="w-full max-w-2xl">
            <SearchBar
              placeholder={searchPlaceholder}
              searchValue={searchValue}
              onChangeFunction={onSearchChange}
              getOnChange
              onSearch={onSearch ?? (() => {})}
              maxWidth="100%"
              height="40px"
            />
          </div>
        )}

        <nav className="flex shrink-0 items-center gap-4 text-sm text-text-primary">
          {isExtraComponent && component}

          <Link to={APP_ROUTES.cart} aria-label="Cart" className="relative flex items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.87-4.594 2.242-6.65a.75.75 0 0 0-.72-.9H5.106M7.5 14.25 5.106 5.25M7.5 14.25 5.106 5.25"
              />
              <circle cx="9" cy="20.25" r="0.75" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20.25" r="0.75" fill="currentColor" stroke="none" />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent-2 text-[10px] font-semibold text-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          {loggedIn ? (
            <AccountMenu userName={userName} />
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={openSignIn} className="cursor-pointer">Log in</button>
              <span className="text-gray-300">|</span>
              <button onClick={openRegister} className="cursor-pointer">Register</button>
            </div>
          )}
        </nav>
      </div>

      <AuthDialog
        isOpen={isAuthOpen}
        handleClose={closeAuth}
        initialMode={authMode}
        onSuccess={() => setLoggedIn(true)}
      />
    </header>
  )
}
