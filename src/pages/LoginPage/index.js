import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Button, Card, DividerAuthSwitch, Input } from '../../components/atoms';
import { AuthLayout } from '../../components/Layout';
import { googleAuth, loginUser } from '../../redux/actions/userAction';
import { breakpoints } from '../../utils';

const LoginPage = () => {
  const [isShowPassword, setIsShowPasswrod] = useState('password');
  const dispatch = useDispatch();
  const router = useHistory();
  const validate = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 charaters')
      .required('Password is required'),
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
              dispatch(loginUser(values, router));
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    errorMessage={
                      errors.email &&
                      touched.email &&
                      errors.email &&
                      errors.email
                    }
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
                    errorMessage={
                      errors.password &&
                      touched.password &&
                      errors.password &&
                      errors.password
                    }
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
                  disabled={
                    !isValid ||
                    (Object.keys(touched).length === 0 &&
                      touched.constructor === Object)
                  }
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>

          <DividerAuthSwitch title="Login with" />
          <Button
            outline
            icon="google"
            onClick={() =>
              dispatch(googleAuth('Sorry, this features under development'))
            }
          >
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
