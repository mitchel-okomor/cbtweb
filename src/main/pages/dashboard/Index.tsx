import React, {useEffect} from 'react'
import {Switch, Route} from 'react-router'
import './index.css'
import Quiz from '../quiz/index.lazy'
import ScoreBoard from '../scoreboard/index.lazy'
import Home from '../home/Index.lazy'

function Index({match}:any) {
	console.log(match)

	  // State cleanup
	  useEffect(() => {
	  document.title = 'Dashboard';
  

	}, []);
  
	return (
		<div className='row'>
		<div className='col-lg-3  col-12'>left
		  {/* <AccountSidebar /> */}
		</div>
		<div className='col-lg-9 col-12'>
		  <Switch>
		  <Route
			  path={ '/account'}
			  exact={true}
			  component={() => <Quiz />}
			/>
			<Route
			  path={ '/account/quiz'}
			  exact={true}
			  component={() => <Quiz />}
			/>
				<Route
			  path={ '/account/scoreboard'}
			  exact={true}
			  component={() => <ScoreBoard />}
			/>
		  </Switch>
		</div>
	  </div>
	)
}

export default Index;
