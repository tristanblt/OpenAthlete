import { getPath } from './routes/paths';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const PATH_AFTER_LOGIN = getPath(['dashboard']);
