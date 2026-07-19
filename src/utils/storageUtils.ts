export const getStorageItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key)
    if (item === null) return defaultValue ?? null
    try {
      return JSON.parse(item) as T
    } catch {
      return item as unknown as T
    }
  } catch {
    return defaultValue ?? null
  }
}

export const setStorageItem = (key: string, value: any): boolean => {
  try {
    const toStore = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, toStore)
    return true
  } catch {
    return false
  }
}

export const removeStorageItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

export const clearStorage = (): boolean => {
  try {
    localStorage.clear()
    return true
  } catch {
    return false
  }
}

export const hasStorageItem = (key: string): boolean => {
  return localStorage.getItem(key) !== null
}
