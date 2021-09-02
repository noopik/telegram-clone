import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card, DividerAuthSwitch, Input } from '../../components/atoms';
import { AuthLayout } from '../../components/Layout';
import {
  breakpoints,
  dispatchTypes,
  regexEmailVadidationType,
  toastify,
} from '../../utils';
import { useForm } from 'react-hook-form';
import { apiAdapter } from '../../config';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const [isShowPassword, setIsShowPasswrod] = useState('password');
  const [handleButtonDisable, setHandleButtonDisable] = useState(true);
  const dispatch = useDispatch();
  const router = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log('dataPost', data);
    apiAdapter
      .post('/users/login', data)
      .then((res) => {
        const token = res.data.data.token;
        const resData = res.data.data;
        // console.log('res data', res.data.data);
        dispatch({ type: dispatchTypes.setUserLogin, value: resData });
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
  };
  // console.log('errors', errors);
  useEffect(() => {
    document.title = 'Telegram | Login';
  }, []);

  useEffect(() => {
    if (getValues('email') && getValues('password')) {
      setHandleButtonDisable(false);
    } else {
      setHandleButtonDisable(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('email'), watch('password')]);

  return (
    <AuthLayout>
      <Card>
        <StyledLoginPage>
          <h3 className="text-md-bold primary text-center">Login</h3>
          <p className="text-sm-regular wellcome">Hi, Welcome back!</p>
          <form>
            <div className="row">
              <Input
                label="Email"
                id="name"
                {...register('email', {
                  required: true,
                  pattern: regexEmailVadidationType,
                })}
                error={errors.email ? true : false}
                errorMessage="Email invalid"
                ref={null}
              />
            </div>
            <div className="row">
              <Input
                label="Password"
                id="password"
                type={isShowPassword}
                showPassword={() =>
                  isShowPassword === 'password'
                    ? setIsShowPasswrod('text')
                    : setIsShowPasswrod('password')
                }
                {...register('password', {
                  required: true,
                })}
                error={errors.password ? true : false}
                errorMessage="Required Password"
                ref={null}
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
              disable={handleButtonDisable}
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </form>
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
