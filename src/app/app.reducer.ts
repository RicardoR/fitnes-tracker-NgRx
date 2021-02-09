import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromUIReducer from './shared/reducers/ui.reducer';
import * as fromAuthReducer from './auth/reducers/auth.reducer';

export interface State {
  ui: fromUIReducer.UIState;
  auth: fromAuthReducer.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUIReducer.UIReducer,
  auth: fromAuthReducer.authReducer,
};

export const getUiState = createFeatureSelector<fromUIReducer.UIState>('ui');
export const getIsLoading = createSelector(
  getUiState,
  fromUIReducer.UIisLoading
);

export const getAuthState = createFeatureSelector<fromAuthReducer.AuthState>(
  'auth'
);
export const getIsAuth = createSelector(
  getAuthState,
  fromAuthReducer.authIsAuth
);
