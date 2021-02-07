import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { UIState, UIReducer, UIisLoading } from './shared/reducers/ui.reducer';

export interface State {
  ui: UIState;
}

export const reducers: ActionReducerMap<State> = {
  ui: UIReducer,
};

export const getUiState = createFeatureSelector<UIState>('ui');
export const getIsLoading = createSelector(getUiState, UIisLoading);
