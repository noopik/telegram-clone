import { apiAdapter } from '../../config';
import { dispatchTypes } from '../../utils';

export const logoutAction = (token, idUser) => (dispatch) => {
  localStorage.removeItem('token');

  const dataUpdate = {
    status: 'offline',
  };

  apiAdapter
    .patch(`/users/${idUser}`, dataUpdate, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({ type: dispatchTypes.setUserLogout });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
