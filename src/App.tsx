import React, {Suspense} from 'react';
import { Switch } from 'react-router-dom';
import OpenRoutes from './routes/OpenRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
import {publicRoutes, protectedRoutes} from './routes/routes'
import './App.css';


function App() {
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
    <div className="App">
	<Suspense fallback={<div>Loading...</div>}>
	<Switch>
        {/* <Provider store={store}>
          <Header /> */}
          {guestRoutes}
          {appRoutes}
          {/* <Footer /> */}
        {/* </Provider> */}
      </Switch>

	</Suspense>
    </div>
  );
}

export default App;
