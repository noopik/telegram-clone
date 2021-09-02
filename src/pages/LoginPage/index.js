import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card, DividerAuthSwitch, Input } from '../../components/atoms';
import { AuthLayout } from '../../components/Layout';
import { apiAdapter } from '../../config';
import { breakpoints, dispatchTypes, toastify } from '../../utils';

const LoginPage = () => {
  const [isShowPassword, setIsShowPasswrod] = useState('password');
  const dispatch = useDispatch();
  const router = useHistory();

  // console.log('errors', errors);
  useEffect(() => {
    document.title = 'Telegram | Login';
  }, []);

  return (
    <AuthLayout>
      <Card>
        <StyledLoginPage>
          <h3 className="text-md-bold primary text-center">Login</h3>
          <p className="text-sm-regular wellcome">Hi, Welcome back!</p>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              if (!values.password) {
                errors.password = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              apiAdapter
                .post('/users/login', values)
                .then((res) => {
                  const token = res.data.data.token;
                  const resData = res.data.data;
                  // console.log('res data', res.data.data);
                  dispatch({
                    type: dispatchTypes.setUserLogin,
                    value: resData,
                  });
                  // console.log('token', token);
                  localStorage.setItem('token', token);
                  router.replace('/');
                })
                .catch((err) => {
                  // console.log('err', err.message);
                  if (err.message === 'Network Error') {
                    toastify('Sorry, our server is down :(', 'error');
                  }
                  if (err.response) {
                    const message = err.response.data.error;
                    toastify(message);
                  }
                });
            }}
          >
            {({
              values,
              errors,
              // touched,
              handleChange,
              handleBlur,
              handleSubmit,
              // isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    error={errors.email ? true : false}
                    errorMessage="Email invalid"
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>
                <div className="row">
                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type={isShowPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={errors.password ? true : false}
                    errorMessage="Required Password"
                    showPassword={() =>
                      isShowPassword === 'password'
                        ? setIsShowPasswrod('text')
                        : setIsShowPasswrod('password')
                    }
                  />
                </div>
                <div className="row">
                  <Link
                    to="/auth/forgot-password"
                    className="text-md-regular anchor forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  primary
                  disabled={Object.values(errors).length > 0 ? true : false}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>

          <DividerAuthSwitch title="Login with" />
          <Button outline icon="google">
            Google
          </Button>
          <div className="footer">
            <p className="text-sm-regular text-center">
              Don’t have an account?{' '}
              <Link to="/auth/register" className="anchor">
                <span className="text-bold primary">Sign Up</span>
              </Link>
            </p>
          </div>
        </StyledLoginPage>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;

// STYLING
const StyledLoginPage = styled.div`
  padding: 42px 70px;
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  ${breakpoints.lessThan('sm')` 
    width: 100%;
  `}
  form {
    display: flex;
    flex-direction: column;
    gap: 35px;
    .forgot-password {
      display: flex;
      justify-content: flex-end;
    }
  }
`;
