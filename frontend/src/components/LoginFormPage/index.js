import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';


function LoginFormPage() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleDemo = () => {
    dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    history.push('/')
  }

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
    <div className='login-container'>

    <div className='main'>
    <img className='logo-img' src="https://img.icons8.com/pastel-glyph/50/26e07f/note.png"/>
      <h1 className='sign' align='center'>CleverNote</h1>
      <div className='login-blurb'>Clevernote, the app whos name rhymes with Evernote</div>
        <div className='login-spacer-div'>
        <div className='login-spacer1'> </div>
        <div className='login-spacer-text'>Login</div>
        <div className='login-spacer2'> </div>
        </div>
      <form onSubmit={handleSubmit} className='form1' >
        <ul>
          {errors.map((error, idx) => <p className='sign' key={idx}>{error}</p>)}
        </ul>
        <input
          type='text'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          className='username'
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

        <button className='submit' type='submit'>Log In</button>
      </form>
      <div className='login-demo-area'>
        <div className='demo-sentance-start'>Demo the site</div> <div 
        onClick={handleDemo}
        className='demo-sentance-end'>here</div>
      </div>
      <div className='create-account-div'>
        <div className='create-account-start'>Dont have an account yet?</div>
        <div className='create-account-end'
        onClick={() => history.push('/signup')}
        >Make one!</div>
      </div>
    </div>
    </div>
  );
}

export default LoginFormPage;