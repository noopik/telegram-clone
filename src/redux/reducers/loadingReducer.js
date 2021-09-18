import { dispatchTypes } from '../../utils';

const initialUser = {
  status: false,
};

export const loadingReducer = (state = { initialUser }, action) => {
  switch (action.type) {
    case dispatchTypes.setLoading:
      return {
        ...state,
        status: action.value,
      };
    default:
      return state;
  }
};
