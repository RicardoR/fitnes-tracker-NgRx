import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuthReducer from './auth/reducers/auth.reducer';
import * as fromUIReducer from './shared/reducers/ui.reducer';

export interface State {
  ui: fromUIReducer.State;
  auth: fromAuthReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUIReducer.UIReducer,
  auth: fromAuthReducer.authReducer,
};

export const getUiState = createFeatureSelector<fromUIReducer.State>('ui');
export const getIsLoading = createSelector(
  getUiState,
  fromUIReducer.UIisLoading
);

export const getAuthState = createFeatureSelector<fromAuthReducer.State>(
  'auth'
);
export const getIsAuth = createSelector(
  getAuthState,
  fromAuthReducer.authIsAuth
);
