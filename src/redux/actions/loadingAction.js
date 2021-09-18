import { dispatchTypes } from '../../utils';

export const loadingAction = (status) => (dispatch) => {
  dispatch({ type: dispatchTypes.setLoading, value: status });
};
