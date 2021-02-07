import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] START LOADING';
export const STOP_LOADING = '[UI] STOP LOADING';

export class UIStartLoading implements Action {
  readonly type = START_LOADING;
}

export class UIStopLoading implements Action {
  readonly type = STOP_LOADING;
}

export type UIActions = UIStartLoading | UIStopLoading;
