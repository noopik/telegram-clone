import { apiAdapter } from '../../config';
import { dispatchTypes, toastify } from '../../utils';
import { loadingAction } from './loadingAction';

export const loginUser = (values, router) => (dispatch) => {
  dispatch(loadingAction(true));

  apiAdapter
    .post('/users/login', values)
    .then((res) => {
      const token = res.data.data.token;
      const resData = res.data.data;
      dispatch({
        type: dispatchTypes.setUserLogin,
        value: resData,
      });
      localStorage.setItem('token', token);
      dispatch(loadingAction(false));
      router.replace('/');
    })
    .catch((err) => {
      dispatch(loadingAction(false));
      if (err.message === 'Network Error') {
        toastify('Sorry, our server is down :(', 'error');
      }
      if (err.response) {
        const message = err.response.data.error;
        toastify(message);
      }
    });
};

export const registerUser = (values, router) => (dispatch) => {
  dispatch(loadingAction(true));

  apiAdapter
    .post('/users/register', values)
    .then(() => {
      toastify('Register success. Please login');
      dispatch(loadingAction(false));
      router.replace('/auth/login');
    })
    .catch((err) => {
      dispatch(loadingAction(false));
      if (err.message === 'Network Error') {
        toastify(`Sorry, our server is down`, 'error');
      }
      if (err.response) {
        const message = err.response.data.error;
        toastify(message);
      }
    });
};

export const forgotPasswordUser = (values, resetForm) => (dispatch) => {
  dispatch(loadingAction(true));
  apiAdapter
    .post('/users/forgot-password', values)
    .then((res) => {
      resetForm();
      dispatch(loadingAction(false));

      return toastify('Success request. Check your email');
    })
    .catch((err) => {
      dispatch(loadingAction(false));
      if (err.message === 'Network Error') {
        toastify('Sorry, our server is down :(', 'error');
      }
      if (err.response?.status === 404) {
        return toastify(err.response.data.error, 'error');
      }
    });
};

export const googleAuth = (values) => (dispatch) => {
  return toastify(values, 'warning');
};

export const updateUser = (values, idUser, token) => (dispatch, getState) => {
  // dispatch(loadingAction(true));
  const userState = getState().userReducer.user;
  let dataUserUpdate = null;
  console.log(values);
  if (values.avatar) {
    dataUserUpdate = new FormData();
    dataUserUpdate.append('avatar', values.avatar);
    dataUserUpdate.append('biography', values.biography);
    dataUserUpdate.append('phone', values.phone);
    dataUserUpdate.append('name', values.name);
  } else {
    delete values.avatar;
    dataUserUpdate = values;
  }
  apiAdapter
    .patch(`/users/${idUser}`, dataUserUpdate, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.data.data.avatar) {
        dispatch({
          type: dispatchTypes.setUpdateUser,
          value: {
            ...userState,
            ...res.data.data,
          },
        });
        dispatch(loadingAction(false));
      } else {
        dispatch({
          type: dispatchTypes.setUpdateUser,
          value: {
            ...userState,
            ...values,
          },
        });
      }
      return toastify(`Success update Profile`);
    })
    .catch((err) => {
      const message = err.response?.data.message;
      // if (values.phone) {
      //   if (message.split(' ').shift() === 'Duplicate') {
      //     return toastify('Phone alredy used', 'error');
      //   }
      // }
      dispatch(loadingAction(false));
      return toastify(message, 'error');
    });
};

export const logoutUser = (token, idUser) => (dispatch) => {
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
    .catch((err) => {});
};

export const deleteUser = (token, idUser, router) => (dispatch) => {
  dispatch(loadingAction(true));
  apiAdapter
    .delete(`/users/${idUser}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      toastify('Success delete account');
      dispatch({ type: dispatchTypes.setUserLogout });
      localStorage.removeItem('token');
      dispatch(loadingAction(false));
      router.replace('/auth/login');
    })
    .catch((err) => {
      dispatch(loadingAction(false));
      toastify(err.response?.message);
    });
};
