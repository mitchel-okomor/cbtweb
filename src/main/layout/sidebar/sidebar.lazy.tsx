import React, { lazy } from 'react';

const LazyIndex = lazy(() => import('./sidebar'));

function Index(props: any) {
  return (
    <div>
      <LazyIndex {...props} />
    </div>
  );
}

export default Index;
