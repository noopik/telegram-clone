import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from '../../pages';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* AUTH */}
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
        {/* <PublicRoute path="/customer-login" component={CustomerLogin} /> */}
        {/* MAIN HOME */}
        {/* <PrivateRoute path="/categories" component={CategoryPage} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
