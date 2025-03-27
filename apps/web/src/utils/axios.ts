import { API_BASE_URL } from '@/config';
import { getAccessToken } from '@/utils/auth';
import { QueryClient } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';

import { ConnectorProvider, Event } from '@openathlete/shared';

import { ACCESS_TOKEN, REFRESH_TOKEN, setItem } from './local-storage';

export const routes = {
  auth: {
    login: '/auth/login',
    refreshToken: '/auth/refresh-token',
    emailExists: '/auth/email-exists',
  },
  user: {
    getMe: '/user/me',
    createAccount: '/user',
  },
  event: {
    create: '/event',
    getMyEvents: '/event',
    getEvent: (eventId: Event['eventId']) => `/event/${eventId}`,
  },
  connector: {
    getOAuthUri: (provider: ConnectorProvider) =>
      `/connector/${provider.toLowerCase()}/uri`,
    setOAuthToken: (provider: ConnectorProvider) =>
      `/connector/${provider.toLowerCase()}/token`,
  },
} as const;

const client = axios.create({
  baseURL: API_BASE_URL,
});

client.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token?.refreshToken) {
    setItem(REFRESH_TOKEN, token.refreshToken);
    setItem(ACCESS_TOKEN, token.accessToken);
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
});

client.interceptors.response.use(undefined, async (error) => {
  if (isAxiosError(error) && error.response?.status === 401) {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    const queryClient = new QueryClient();
    queryClient.clear();
  } else {
    throw error;
  }
});

export default client;
