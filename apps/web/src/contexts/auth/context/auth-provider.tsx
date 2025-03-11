/* eslint-disable no-console */
import { getPath } from '@/routes/paths';
import { UserService } from '@/services/user/user.service';
import { isValidToken } from '@/utils/auth';
import { ACCESS_TOKEN, clear, getItem, setItem } from '@/utils/local-storage';
import { useCallback, useEffect, useMemo, useReducer } from 'react';

import { user } from '@openathlete/database';

import { ActionMapType, AuthContextType, AuthStateType } from '../types';
import { AuthContext } from './auth-context';

enum Types {
  INITIAL = 'INITIAL',
  LOGOUT = 'LOGOUT',
}

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

type Props = {
  children: React.ReactNode;
};

type Payload = {
  [Types.INITIAL]: {
    user: user | null;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const access_token = getItem(ACCESS_TOKEN);

      if (access_token && isValidToken(access_token)) {
        setItem(ACCESS_TOKEN, access_token);

        const user = await UserService.getMe();

        dispatch({
          type: Types.INITIAL,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  const logout = useCallback(() => {
    clear();
    dispatch({
      type: Types.LOGOUT,
    });
    window.location.href = getPath(['auth', 'login']);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo<AuthContextType>(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      initialize,
      logout,
    }),
    [state.user, status, initialize],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
