import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import io from 'socket.io-client';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLogin, setIsLogin] = useState({ check: false, result: false });
  const token = localStorage.getItem('token');
  const [socket, setSocket] = useState(null);

  // START = SETUP SOCKET
  const setupSocket = () => {
    if (token && !socket) {
      // const resultSocket = io('http://localhost:3030');
      const resultSocket = io('http://localhost:3030', {
        query: {
          token,
        },
      });
      // resultSocket.on();
      setSocket(resultSocket);
    }
  };

  useEffect(() => {
    setupSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      setIsLogin({ check: true, result: true });
      // apiAdapter
      //   .get('/users/verify-token', {
      //     headers: { Authorization: `Bearer ${token}` },
      //   })
      //   .then((res) => {
      //     // console.log(res);
      //     setIsLogin({ check: true, result: true });
      //   })
      //   .catch((err) => {
      //     console.log(err.response);
      //     setIsLogin({ check: true, result: false });
      //   });
    } else {
      setIsLogin({ check: true, result: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  // console.log('isLogin in private', isLogin);

  return (
    <>
      {isLogin.check && (
        <Route
          {...rest}
          render={(props) => {
            return isLogin.result ? (
              <Component {...props} socket={socket} />
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
