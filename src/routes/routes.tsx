import React from 'react';
import Home from '../main/pages/home/Index.lazy';
import Login from '../main/pages/auth/login/Index.lazy';
import Register from '../main/pages/auth/register/index.lazy';
import ForgotPassword from '../main/pages/auth/forgotpassword/index.lazy';
import ResetPassword from '../main/pages/auth/resetpassword/index.lazy';
import Dashboard from '../main/pages/dashboard/dashboard.lazy';

type route = {
  path: string;
  exact: boolean;
  component: React.FC;
  name: string;
};

export const publicRoutes: Array<route> = [
  { path: '/', exact: true, component: Dashboard, name: 'Dashboard' },
  { path: '/account', exact: true, component: Dashboard, name: 'Dashboard' },
  { path: '/quiz', exact: true, component: Dashboard, name: 'Dashboard' },
  { path: '/scoreboard', exact: true, component: Dashboard, name: 'Dashboard' },
  { path: '/dashboard', exact: true, component: Dashboard, name: 'Dashboard' },
  { path: '/history', exact: true, component: Dashboard, name: 'Dashboard' },
  { path: '/levels', exact: true, component: Dashboard, name: 'Dashboard' },
  { path: '/settings', exact: true, component: Dashboard, name: 'Dashboard' },
  { path: '/home', exact: true, component: Home, name: 'Home' },

  {
    path: '/register/:role',
    exact: true,
    component: Register,
    name: 'Register'
  },
  {
    path: '/register',
    exact: true,
    component: Register,
    name: 'Register'
  },
  { path: '/login', exact: true, component: Login, name: 'Login' },
  {
    path: '/forgot-password',
    exact: true,
    component: ForgotPassword,
    name: 'ForgotPassword'
  },
  {
    path: '/reset-password/:token',
    exact: true,
    component: ResetPassword,
    name: 'ResetPassword'
  }
];

// Authenticated routes
export const protectedRoutes: Array<route> = [
  { path: '/account', component: Dashboard, exact: true, name: 'Dashboard' }
];
