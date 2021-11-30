/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { authSelector, fetchUser } from '../store/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const ProtectedRoutes: FunctionComponent<any> = ({
  component: Component,
  ...rest
}) => {
  const { data } = useSelector(authSelector);
  const { user } = data;

  const history = useHistory();

  if (!user) history.push('/login');

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoutes;
