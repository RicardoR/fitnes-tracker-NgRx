export interface State {
  isLoading: boolean;
}

export const STATE_TYPES = {
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
};

const initialState: State = {
  isLoading: false,
};

export function appReducer(state = initialState, action): State {
  switch (action.type) {
    case STATE_TYPES.START_LOADING:
      return { isLoading: true };
    case STATE_TYPES.STOP_LOADING:
      return { isLoading: false };
    default:
      return state;
  }
}
