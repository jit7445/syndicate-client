export const getStorageItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue ?? null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  } catch {
    return defaultValue ?? null;
  }
};

export const setStorageItem = (key: string, value: any): boolean => {
  try {
    // Always JSON-encode, even for strings — getStorageItem always tries
    // JSON.parse on read, so an unquoted numeric-looking string (e.g. a
    // userId of "1") would otherwise come back as the number 1 instead of
    // the string "1". JSON-encoding here keeps the round-trip lossless; the
    // JSON.parse failure fallback in getStorageItem still handles reading
    // any legacy unquoted values already sitting in storage.
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const removeStorageItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const clearStorage = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch {
    return false;
  }
};

export const hasStorageItem = (key: string): boolean => {
  return localStorage.getItem(key) !== null;
};
