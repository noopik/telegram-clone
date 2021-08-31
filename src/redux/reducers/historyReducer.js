import { dispatchTypes } from '../../utils';

const initialUser = {
  data: [],
};

// REDUCER FOR REGISTER FLOW
export const historyReducer = (state = { initialUser }, action) => {
  switch (action.type) {
    case dispatchTypes.setHistory:
      return {
        ...state,
        data: action.value,
      };
    default:
      return state;
  }
};
