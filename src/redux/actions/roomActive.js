import { apiAdapter } from '../../config';
import { dispatchTypes } from '../../utils';
const token = localStorage.getItem('token');

export const roomActiveAction = (idRoom) => (dispatch) => {
  console.log('idRoom', idRoom);
  apiAdapter
    .get(`/users/${idRoom}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const resData = res.data.data[0];
      dispatch({ type: dispatchTypes.setRoomActive, value: resData });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
