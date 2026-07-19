import { clearStorage, getStorageItem, setStorageItem } from './storageUtils'
import { APP_ROUTES } from '../constants/appRoutes'

type JWTPayload = {
  user_id: string
  user_name: string
  email: string
  [key: string]: unknown
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const payload = token.split('.')[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export const processToken = (token: string): void => {
  setStorageItem('token', token)
  setStorageItem('authToken', token)

  const payload = decodeJWT(token)
  if (payload) {
    setStorageItem('userId', payload.user_id)
    setStorageItem('userName', payload.user_name)
    setStorageItem('email', payload.email)
  }
}

export const isLoggedIn = (): boolean => {
  return !!getStorageItem<string>('token')
}

export const logout = (): void => {
  clearStorage()
  window.location.href = APP_ROUTES.home
}

// Handles SSO handoff from the main Infollion site, e.g. https://.../transcripts?auth_token=...
export const consumeAuthTokenFromUrl = (): void => {
  const params = new URLSearchParams(window.location.search)
  const authToken = params.get('auth_token')
  if (!authToken) return

  processToken(authToken)

  params.delete('auth_token')
  const newSearch = params.toString()
  const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash}`
  window.history.replaceState({}, '', newUrl)
}
