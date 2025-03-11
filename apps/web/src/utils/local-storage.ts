export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const getItem = (key: string) => localStorage.getItem(key);
export const setItem = (key: string, value: string) =>
  localStorage.setItem(key, value);
export const removeItem = (key: string) => localStorage.removeItem(key);
export const clear = () => localStorage.clear();
