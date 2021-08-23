import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {
  const history = useHistory()
  const dispatch = useDispatch();
 
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  

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
    <div className='signup-container'>
    <div className='main'>
    <img className='logo-img' src="https://img.icons8.com/pastel-glyph/50/26e07f/note.png" alt=''/>
      <h1 className='sign' align='center'>CleverNote</h1>
      <div className='login-blurb'>Clevernote, the app whos name rhymes with Evernote</div>
        <div className='login-spacer-div'>
        <div className='login-spacer1'> </div>
        <div className='login-spacer-text'>Sign Up</div>
        <div className='login-spacer2'> </div>
        </div>
      
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
          className='username-signup'
          placeholder='Email'
        />

        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className='username-signup'
          placeholder='Username'
        />

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='password'
          placeholder='Password'
        />

        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='password'
          placeholder='Confirm Password'
        />

        <button className='submit' type='submit'>
          Sign Up
        </button>
      </form>
      <div className='create-account-div'>
        <div className='create-account-start'>Already have an account?</div>
        <div className='create-account-end'
        onClick={() => history.push('/login')}
        >Login!</div>
      </div>
    </div>
    </div>
  );
}

export default SignupFormPage;
