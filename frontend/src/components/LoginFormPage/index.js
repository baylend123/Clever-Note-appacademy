import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='main three' >
      <h1 className='sign' align='center'>Sign in below</h1>
      <form onSubmit={handleSubmit} className='form1' >
        <ul>
          {errors.map((error, idx) => <p className='sign' key={idx}>{error}</p>)}
        </ul>

        <input
          type='text'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className='un'
          placeholder='Username'
        />


        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='pass'
          placeholder='Password'
        />

        <button className='submit' type='submit'>Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;