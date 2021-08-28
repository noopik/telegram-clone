// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Redirect, Route } from 'react-router-dom';
// import { Axios } from '..';
// import { showLoading } from '../../redux/actions';
// import { typeRedux } from '../../utils';

// const PublicRoute = ({ component: Component, ...rest }) => {
//   const [isLogin, setIsLogin] = useState({ check: false, passed: false });
//   // const userState = useSelector((state) => state.userReducer);
//   const token = localStorage.getItem('token');
//   const dispatch = useDispatch();

//   // CHECK IS USER LOGIN EXIST OR NOT
//   useEffect(() => {
//     dispatch(showLoading(true));
//     Axios.get(`/users/verify-token`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((result) => {
//         const dataResult = result.data.data;
//         setIsLogin({ check: true, passed: true });
//         dispatch({ type: typeRedux.setUserLogin, value: dataResult });
//         dispatch(showLoading(false));
//       })
//       .catch((err) => {
//         setIsLogin({ check: true, passed: false });
//         dispatch(showLoading(false));
//       });
//   }, []);

//   return (
//     <>
//       {isLogin.check && (
//         <Route
//           {...rest}
//           render={(props) => {
//             return isLogin.passed ? (
//               <Redirect to="/" />
//             ) : (
//               <Component {...props} />
//             );
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default PublicRoute;
