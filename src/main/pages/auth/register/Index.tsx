/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import './index.css'
import validate from '../../../../utility/validator'
import {authSelector, register, clearState} from '../../../../store/authSlice'
import swalAlert from '../../../../utility/alert'
import Loader from '../../../components/Loader'


const Index: React.FC = (props:any)=> {	
 const dispatch = useDispatch()
 const history = useHistory()
 const { data, success, isFetching, isError, errorMessage, successMessage }  = useSelector(authSelector);

	const initialInput:any = {}

	const [error, setError] = useState()
	const [inputs, setInput] = useState(initialInput);
	const [canSubmit, setCanSubmit] = useState(false);


	const {firstname, lastname, email, password, confirmPassword} = inputs;


const handleChange = (e:any)=>{
 setInput({...inputs, [e.target.name]: e.target.value})
setCanSubmit(validate(inputs, setError))
}

const handleSubmit=(e:any)=>{
	e.preventDefault();
	dispatch(register(inputs))

}

const handleBlur = ()=>{
 setCanSubmit(validate(inputs, setError));
}

// Success callback
useEffect(() => {
    // On Success
    if (success) {
      setInput({firstname:'', lastname:'', email:'', password:'', confirmPassword:''});
      swalAlert("Registration", successMessage, "success");
      // dispatch(clearState());
    }

    // On Error
    if (isError) {
		swalAlert("Registration",errorMessage, "error");
      dispatch(clearState());
    }
  }, [data, isError, success]);

  // State cleanup
  useEffect(() => {
	  if(data.user) history.push('/')
    document.title = 'Sign Up';

    return () => {
      dispatch(clearState());
    };
  }, [data]);



	return (
		<div className="container-fluid mt-5  pt-5 appform ">
		<div className="row d-flex justify-content-center ">
		{ isFetching ? <Loader /> :
		
		<form onSubmit={handleSubmit} className="bg-white shadow mb-5">
			<div className="pt-2 pb-5">
			  <h1 className="text-center">Sign Up</h1>
  
			  <div className="from-group">
				<label >
				 <span className="danger">{error && error['firstname']}</span>
				</label>
				<br />
				<div className="input-group ">
			
				  <input
					type="text"
					className="form-control"
					id="firstname"
					name="firstname"
					value={firstname}
					placeholder="First name"
					onChange={handleChange}
					onBlur={handleBlur}
					required
				  />
				</div>
			  </div>
  
			  <div className="from-group">
				<label >
				   <span className="danger">{error && error['lastname']}</span>
				</label>{" "}
				<br />
				<div className="input-group ">
				  <input
					type="text"
					className="form-control"
					id="lastname"
					name="lastname"
					value={lastname}
					placeholder="Lastname"
					onChange={handleChange}
					onBlur={handleBlur}
					required
				  />
				</div>
			  </div>
  
  
			  <div className="from-group">
				<label htmlFor="email">
				   <span className="danger">{error && error['email']}</span>
				</label>
				<br />
				<div className="input-group ">
				  <input
					type="email"
					className="form-control"
					id="email"
					placeholder="email"
					name="email"
					value={email}
					onChange={handleChange}
					onBlur={handleBlur}
					required
				  />
				</div>
			  </div>
		
			  
			  <div className="from-group">
				<label htmlFor="password">
				 <span className="danger">{error && error['password']}</span>
				</label>
				<br />
				<div className="input-group ">
				  <input
					type="password"
					className="form-control"
					id="password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={handleChange}
					onBlur={handleBlur}
					required
				  />
				</div>
			  </div>
			  <div className="from-group ">
				<label >
				<span className="danger">{error && error['confirmPassword']}</span>
				</label>
				<br />
				<div className="input-group ">
				  <input
					type="password"
					className="form-control"
					id="confirm"
					placeholder="Confirm Password"
					name="confirmPassword"
					value={confirmPassword}
					onBlur={handleBlur}
					onChange={handleChange}
					required
				  />
				</div>
			  </div>
  
  
			</div>
			<div className="input-group">
			  <button type="submit" disabled={!canSubmit}>Submit</button>
			</div>
  
			<div className="mt-5 d-flex justify-content-center align-items-center login ">
			  <p>
				Already have an account? <Link to="/login" className="login-link">Login</Link>
			  </p>
			</div>
		</form>}
		</div>
	  </div>
	)
}

export default Index;
