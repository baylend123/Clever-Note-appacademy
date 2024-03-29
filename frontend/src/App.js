import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Sidebar from './components/Sidebar';
import NoteComponent from './components/NoteComponent';
import WriteNote from './components/WriteNote'
import MainPageComponent from './components/MainPageComponent';
import NoteBooksComponent from './components/NoteBooksComponent';


import * as sessionActions from './store/session';


import './index.css'

function App() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state?.session?.user)

  if (user === undefined) {
    history.push('/login')
  }



  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className='main-container'>
      {!user &&
        <>
          <Route path='/login' exact={true}>
            <LoginFormPage />
          </Route>
          <Route path='/signup' exact={true}>
            <SignupFormPage />
          </Route>
        </>
      }
      {isLoaded && user && (
        <>
        <div className='after-login'>
          <Sidebar isLoaded={isLoaded} />
          <Switch>
            <Route path='/' exact>
              <MainPageComponent />
            </Route>
            <Route path='/notes/:id'>
              <NoteComponent />
            </Route>
            <Route path='/notebooks' exact>
              <NoteBooksComponent />
            </Route>
            <Route path='/notebook/:notebookId/:noteId'>
              <NoteComponent />
              <WriteNote />
            </Route>
            <Route path='/note/new'>
              <WriteNote />
            </Route>

          </Switch>
          </div>
        </>

      )}
    </div>
  );
}

export default App;


