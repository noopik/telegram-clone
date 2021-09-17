import { apiAdapter } from '../../config';
import { dispatchTypes, toastify } from '../../utils';

export const loginUser = (values, router) => (dispatch) => {
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
      router.replace('/');
    })
    .catch((err) => {
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
  apiAdapter
    .post('/users/register', values)
    .then(() => {
      toastify('Register success. Please login');
      router.replace('/auth/login');
    })
    .catch((err) => {
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
  apiAdapter
    .post('/users/forgot-password', values)
    .then((res) => {
      resetForm();
      return toastify('Success request. Check your email');
    })
    .catch((err) => {
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
    .catch((err) => {
      console.log(err.response);
    });
};
