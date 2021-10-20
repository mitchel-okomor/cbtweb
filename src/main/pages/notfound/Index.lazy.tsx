import React, {lazy} from 'react'

const LazyHome = lazy(() => import('./Index'));

const Index: React.FC = (props:any)=> {
	return (
		<div>
			<LazyHome {...props} />
		</div>
	)
}

export default Index;
