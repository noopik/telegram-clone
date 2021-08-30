import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import apiAdapter from '../../config/apiAdapter';
import { dispatchTypes, toastify } from '../../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLogin, setIsLogin] = useState({ check: false, result: false });
  const token = localStorage.getItem('token');

  // const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      apiAdapter
        .get('/users/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log(res);
          setIsLogin({ check: true, result: true });
        })
        .catch((err) => {
          // console.log(err);
          setIsLogin({ check: true, result: false });
        });
    } else {
      setIsLogin({ check: true, result: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  // console.log('isLogin in private', isLogin);

  // console.log(isLogin);
  return (
    <>
      {isLogin.check && (
        <Route
          {...rest}
          render={(props) => {
            return isLogin.result ? (
              <Component {...props} />
            ) : (
              <Redirect to="/auth/login" />
            );
          }}
        />
      )}
      {!isLogin.check && null}
    </>
  );
};

export default PrivateRoute;
