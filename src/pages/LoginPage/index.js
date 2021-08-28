import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Card, DividerAuthSwitch, Input } from '../../components/atoms';
import { AuthLayout } from '../../components/Layout';
import { breakpoints } from '../../utils';

const LoginPage = () => {
  const [isShowPassword, setIsShowPasswrod] = useState('password');

  useEffect(() => {
    document.title = 'Telegram | Login';
  }, []);

  return (
    <AuthLayout>
      <Card>
        <StyledLoginPage>
          <h3 className="text-md-bold primary text-center">Login</h3>
          <p className="text-sm-regular wellcome">Hi, Welcome back!</p>
          <form>
            <div className="row">
              <Input label="Email" id="name" />
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
            <Button primary>Login</Button>
          </form>
          <DividerAuthSwitch title="Login with" />
          <Button outline icon="google">
            Login
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
