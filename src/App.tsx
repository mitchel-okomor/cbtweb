import React, { Suspense } from 'react';
import { Switch, Router, useHistory } from 'react-router-dom';
import { authSelector } from './store/authSlice';
import { useSelector } from 'react-redux';
import OpenRoutes from './routes/OpenRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { publicRoutes, protectedRoutes } from './routes/routes';
import Header from './main/layout/header/header.lazy';
import './App.css';

function App() {
  const { data } = useSelector(authSelector);
  const { user } = data;

  const history = useHistory();
  const guestRoutes = publicRoutes.map((route, key) => {
    return (
      <OpenRoutes
        exact={route.exact}
        path={route.path}
        component={route.component}
        name={route.name}
        key={key}
      />
    );
  });

  const appRoutes = protectedRoutes.map((route, index) => {
    return (
      <ProtectedRoutes
        exact={route.exact}
        path={route.path}
        component={route.component}
        name={route.name}
        key={index}
      />
    );
  });

  return (
    <div className='App'>
      <Suspense fallback={<div>Loading...</div>}>
        <Router history={history}>
          {!user && <Header />}

          <Switch>
            {/* <Provider store={store}> */}

            {guestRoutes}
            {appRoutes}
            {/* <Footer /> */}
            {/* </Provider> */}
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
