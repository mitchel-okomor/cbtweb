/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { authSelector, fetchUser } from '../store/authSlice';
import { useSelector } from 'react-redux';

const OpenRoutes: FunctionComponent<any> = ({
  component: Component,
  ...rest
}) => {
  const { data, isFetching } = useSelector(authSelector);

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default OpenRoutes;
