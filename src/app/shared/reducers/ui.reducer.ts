import { START_LOADING, STOP_LOADING, UIActions } from './ui.actions';

export interface UIState {
  isLoading: boolean;
}

const initialState: UIState = {
  isLoading: false,
};

export function UIReducer(state = initialState, action: UIActions): UIState {
  switch (action.type) {
    case START_LOADING:
      return { isLoading: true };
    case STOP_LOADING:
      return { isLoading: false };
    default:
      return state;
  }
}

export const UIisLoading = (state: UIState) => state.isLoading;
