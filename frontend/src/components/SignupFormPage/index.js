import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      'Confirm Password field must be the same as the Password field',
    ]);
  };

  return (
    <div className='main three'>
      <h1 className='sign' align='center'>
        Sign Up Below
      </h1>
      <form onSubmit={handleSubmit} className='form1'>
        <ul>
          {errors.map((error, idx) => (
            <p className='sign' key={idx}>
              {error}
            </p>
          ))}
        </ul>

        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='un'
          placeholder='Email'
        />

        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='pass'
          placeholder='Confirm Password'
        />

        <button className='submit' type='submit'>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
