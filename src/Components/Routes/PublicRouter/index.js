import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const authId = Cookies.get('auth');

const PublicRoute = ({ component: Component, authStatus, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authStatus ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
