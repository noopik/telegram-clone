import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  RegisterPage,
} from '../../pages';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* AUTH */}
        <PublicRoute path="/auth/login" component={LoginPage} />
        <PublicRoute path="/auth/register" component={RegisterPage} />
        <PublicRoute
          path="/auth/forgot-password"
          component={ForgotPasswordPage}
        />
        <PrivateRoute path="/" component={HomePage} />
        {/* <PublicRoute path="/customer-login" component={CustomerLogin} /> */}
        {/* MAIN HOME */}
        {/* <PrivateRoute path="/categories" component={CategoryPage} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
