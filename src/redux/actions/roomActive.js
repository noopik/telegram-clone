import { apiAdapter } from '../../config';
import { dispatchTypes } from '../../utils';

export const roomActiveAction = (token, idRoom) => (dispatch) => {
  apiAdapter
    .get(`/users/${idRoom}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const resData = res.data.data[0];
      dispatch({ type: dispatchTypes.setRoomActive, value: resData });
    })
    .catch((err) => {
      // console.log(err.response);
    });
};
