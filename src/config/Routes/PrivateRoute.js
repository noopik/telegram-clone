import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import io from 'socket.io-client';
const { REACT_APP_HOST_SOCKET } = process.env;

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const { HOST_SOCKET } = process.env;

  const [isLogin, setIsLogin] = useState({ check: false, result: false });
  // const userState = useSelector((state) => state.userReducer);
  const token = localStorage.getItem('token');
  const [socket, setSocket] = useState(null);
  // console.log('process.env.HOST_SOCKET', REACT_APP_HOST_SOCKET);
  // START = SETUP SOCKET
  const setupSocket = () => {
    if (token && !socket) {
      // const resultSocket = io('http://localhost:3030');
      // console.log('run');
      const resultSocket = io(`http://localhost:3030`, {
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

  // IN DEVELOPMENT
  // useEffect(() => {
  //   if (socket) {
  //     socket.emit('login', { userId: userState.idUser });
  //   }
  // }, [socket]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('onlineStatus', (data) => {
  //       console.log('onlineStatus', data);
  //     });
  //   }
  // }, [socket]);

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
              <Redirect to="/landing-page" />
            );
          }}
        />
      )}
      {!isLogin.check && null}
    </>
  );
};

export default PrivateRoute;
