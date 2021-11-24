import React, { lazy } from 'react';

const LazyIndex = lazy(() => import('./scoreboard'));

function Index(props: any) {
  return (
    <div>
      <LazyIndex {...props} />
    </div>
  );
}

export default Index;
