/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Index.css';
import validate from '../../../../utility/validator';
import { authSelector, login, clearState } from '../../../../store/authSlice';
import swalAlert from '../../../../utility/alert';
import Loader from '../../../components/Loader';

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data, success, isFetching, isError, errorMessage, successMessage } =
    useSelector(authSelector);

  const initialInput: any = {};

  const [error, setError] = useState();
  const [inputs, setInput] = useState(initialInput);

  const { email, password } = inputs;

  const handleChange = (e: any) => {
    setInput({ ...inputs, [e.target.name]: e.target.value });
    validate(inputs, setError);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login(inputs));
  };

  const handleBlur = () => {
    validate(inputs, setError);
  };
  // State cleanup
  useEffect(() => {
    if (data.user) history.push('/');

    document.title = 'Login';

    return () => {
      dispatch(clearState());
    };
  }, [data.user]);

  // Success callback
  useEffect(() => {
    // On Success
    if (success) {
      setInput({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      swalAlert('Login', successMessage, 'success');
      // dispatch(clearState());
    }

    // On Error
    if (isError) {
      swalAlert('Login', errorMessage, 'error');
      dispatch(clearState());
    }
  }, [data, isError, success]);

  return (
    <div className='container-fluid mt-5  pt-5 appform '>
      <div className='row d-flex justify-content-center '>
        {isFetching ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className='bg-white shadow mb-5'>
            <div className='pt-5 pb-5'>
              <h1 className='text-center'>Login</h1>

              <div className='from-group'>
                <label htmlFor='email'>
                  <span className='danger'>{error && error['email']}</span>
                </label>
                <br />
                <div className='input-group '>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
              </div>

              <div className='from-group'>
                <label htmlFor='password'>
                  <span className='danger'></span>
                </label>
                <br />
                <div className='input-group '>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='input-group'>
              <button type='submit'>Submit</button>
            </div>

            <div className='mt-5 d-flex justify-content-center align-items-center login '>
              <p>
                Don't have an account? <Link to='/register'>Signup</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Index;
