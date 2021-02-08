import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import { UIState, UIReducer, UIisLoading } from './shared/reducers/ui.reducer';
import {
  authReducer,
  AuthState,
  authIsAuth,
} from './auth/reducers/auth.reducer';

export interface State {
  ui: UIState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  ui: UIReducer,
  auth: authReducer,
};

export const getUiState = createFeatureSelector<UIState>('ui');
export const getIsLoading = createSelector(getUiState, UIisLoading);

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, authIsAuth);
