import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { decode } from 'jsonwebtoken';

import { routes } from './axios';
import { ACCESS_TOKEN, REFRESH_TOKEN, getItem } from './local-storage';

type TokenInfo = {
  accessToken: string;
  refreshed: boolean;
} & (
  | {
      refreshed: true;
      refreshToken: string;
    }
  | {
      refreshed: false;
      refreshToken?: never;
    }
);

export async function refreshToken(): Promise<TokenInfo | null> {
  const token = getItem(REFRESH_TOKEN);
  if (!token) return null;

  try {
    const tokenData = await axios.post(
      `${API_BASE_URL}${routes.auth.refreshToken}`,
      {
        refreshToken: token,
      },
    );

    if (!tokenData.data) return null;
    const { accessToken, refreshToken } = tokenData.data;

    return {
      accessToken,
      refreshToken,
      refreshed: true,
    };
  } catch {
    return null;
  }
}

export function isValidToken(token: string): boolean {
  try {
    const decoded = decode(token);
    if (!decoded || typeof decoded === 'string' || !decoded.exp) return false;
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export async function getAccessToken(): Promise<TokenInfo | null> {
  const token = getItem(ACCESS_TOKEN);
  if (!token) return refreshToken();
  if (!isValidToken(token)) return refreshToken();
  return { accessToken: token, refreshed: false };
}
