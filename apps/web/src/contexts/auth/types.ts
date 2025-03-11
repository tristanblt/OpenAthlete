import { user } from '@openathlete/database';

export type ActionMapType<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: user | null;
};

export type AuthContextType = {
  user: user | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  initialize: () => Promise<void>;
  logout: () => void;
};
