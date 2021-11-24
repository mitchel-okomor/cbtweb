import React, { Suspense, useEffect } from 'react';
import { Switch, Router, useHistory } from 'react-router-dom';
import { authSelector, fetchUser } from './store/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import OpenRoutes from './routes/OpenRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { publicRoutes, protectedRoutes } from './routes/routes';
import Header from './main/layout/header/header.lazy';
import './App.css';
import Loader from './main/components/Loader';

function App() {
  const { data, isFetching } = useSelector(authSelector);
  const { user } = data;

  const history = useHistory();
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchUser(''));
  }, []);

  return (
    <div className='App'>
      {isFetching && <Loader />}
      {!isFetching && (
        <>
          <Suspense
            fallback={
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <Loader />
              </div>
            }
          >
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
        </>
      )}
    </div>
  );
}

export default App;
