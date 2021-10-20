import React, {lazy} from 'react'

const LazyIndex = lazy(() => import('./Index'));

const Index: React.FC = (props:any)=> {	
	
	return (

		<div>
			<LazyIndex {...props} />
		</div>
	)
}

export default Index;
