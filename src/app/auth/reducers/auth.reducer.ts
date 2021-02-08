import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { isAuthenticated: true };
    case SET_UNAUTHENTICATED:
      return { isAuthenticated: false };
    default:
      return state;
  }
}

export const authIsAuth = (state: AuthState) => {
  return state.isAuthenticated;
};
