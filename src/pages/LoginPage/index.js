import { Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card, DividerAuthSwitch, Input } from '../../components/atoms';
import { AuthLayout } from '../../components/Layout';
import { apiAdapter } from '../../config';
import { breakpoints, dispatchTypes, toastify } from '../../utils';
import * as Yup from 'yup';

const LoginPage = () => {
  const [isShowPassword, setIsShowPasswrod] = useState('password');
  const dispatch = useDispatch();
  const router = useHistory();
  const validate = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

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
            validationSchema={validate}
            onSubmit={(values, { setSubmitting }) => {
              // console.log('values', values);
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
            {(formik) => (
              <Form>
                <div className="row">
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    errorMessage="Email invalid"
                  />
                </div>
                <div className="row">
                  <Input
                    label="Password"
                    id="password"
                    name="password"
                    type={isShowPassword}
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
                  type="submit"
                  disabled={Object.keys(formik.errors).length > 0}
                >
                  Submit
                </Button>
              </Form>
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
