import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Button, Card, DividerAuthSwitch, Input } from '../../components/atoms';
import { AuthLayout } from '../../components/Layout';
import { apiAdapter } from '../../config';
import { breakpoints, toastify } from '../../utils';

const RegisterPage = () => {
  const [isShowPassword, setIsShowPasswrod] = useState('password');
  const router = useHistory();
  const validate = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  useEffect(() => {
    document.title = 'Telegram | Register';
  }, []);

  return (
    <AuthLayout>
      <Card>
        <StyledLoginPage>
          <div className="header">
            <svg
              onClick={() => {
                return router.goBack();
              }}
              width="11"
              height="19"
              viewBox="0 0 11 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.20711 9.3271L9.22925 3.30496C9.24226 3.29283 9.2551 3.28044 9.26777 3.26777L9.97487 2.56066C10.5607 1.97487 10.5607 1.02513 9.97487 0.43934C9.38909 -0.146447 8.43934 -0.146447 7.85355 0.43934L7.52579 0.767105L7.52513 0.766442L0.732233 7.55933C-0.244077 8.53564 -0.244079 10.1186 0.732233 11.0949L7.14646 17.5091L7.52513 17.8878L7.85357 18.2162C8.43936 18.802 9.3891 18.802 9.97489 18.2162C10.5607 17.6304 10.5607 16.6807 9.97489 16.0949L9.64645 15.7664L9.26778 15.3878C9.26635 15.3863 9.2649 15.3849 9.26346 15.3835L3.20711 9.3271Z"
                fill="#7E98DF"
              />
            </svg>
            <h3 className="text-md-bold primary text-center">Register</h3>
          </div>
          <p className="text-sm-regular wellcome">Hi, Welcome back!</p>
          <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={validate}
            onSubmit={(values, { setSubmitting }) => {
              // console.log('values', values);
              apiAdapter
                .post('/users/register', values)
                .then(() => {
                  toastify('Register success. Please login');
                  router.replace('/auth/login');
                })
                .catch((err) => {
                  // console.log('err', err);
                  // console.log('err.response', err.response);
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
                    label="Name"
                    id="name"
                    name="name"
                    type="name"
                    errorMessage="Required name"
                  />
                </div>
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
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          <DividerAuthSwitch title="Register with" />
          <Button outline icon="google">
            Google
          </Button>
        </StyledLoginPage>
      </Card>
    </AuthLayout>
  );
};

export default RegisterPage;

// STYLING
const StyledLoginPage = styled.div`
  padding: 42px 70px;
  width: 500px;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 35px;
  .header {
    display: flex;
    align-items: center;
    svg {
      width: 32px;
      &:hover {
        cursor: pointer;
      }
    }
    h3 {
      width: 100%;
    }
  }
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
