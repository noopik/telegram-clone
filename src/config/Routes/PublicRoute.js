import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  const [isLogin, setIsLogin] = useState({ check: false, result: false });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setIsLogin({ check: true, result: true });
    } else {
      setIsLogin({ check: true, result: false });
    }
  }, [token]);

  if (!isLogin.check) {
    return null;
  }

  // console.log('isLogin', isLogin);
  return (
    <>
      {isLogin.check && (
        <Route
          {...rest}
          render={(props) => {
            return isLogin.result ? (
              <Redirect to="/" />
            ) : (
              <Component {...props} />
            );
          }}
        />
      )}
    </>
  );
};

export default PublicRoute;
