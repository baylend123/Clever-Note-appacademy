import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Sidebar from "./components/Sidebar";
import NoteComponent from "./components/NoteComponent";
import NewNoteBookForm from "./components/NewNoteBookForm";
import MainPageComponent from "./components/MainPageComponent";
import github from './images/download.png'

import * as sessionActions from "./store/session";
import Snake from 'react-simple-snake'

import './index.css'

function App() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state?.session?.user)
  let snakeGame;






  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  if (!user) {
    snakeGame = (

      <Snake />
    )

  }
  const numby = Math.floor(Math.random() * Math.floor(15) + 1)

  const demoUser = () => {
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    history.push(`/notebook/${numby}/new-note`)
  }
  return (
    <div className='main-container'>
      <Sidebar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <MainPageComponent />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/notes">
            <NoteComponent />
          </Route>
          {/* <Route path="/new-notebook">
            <NewNoteBookForm />
          </Route>
          <Route path="/notebook/:id">
            <NoteComponent />
          </Route> */}
        </Switch>


      )}
      {!user &&
        <>
          <div className='two'>
            <img src='https://i.ibb.co/h2YN9vv/Clever-Note-1.png' alt=''></img>
            <h1 className='DemoUserHeader' align='center'>Click Here to Log In As Demo-User</h1>
            <div align='right'>
              <button onClick={demoUser} align='right' className="DemoUserButton">Demo User</button>
            </div>
            <div style={{ width: '200px', height: '10vh', marginTop: '100px', display: 'flex', flexDirection: 'row', }} >
              <img style={{ height: '10vh', width: '100px', borderRadius: '20px' }} src={github} alt='' ></img>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginTop: '10px' }}>Baylen Doss</div>
                <a style={{ marginTop: '10px' }} href="https://github.com/baylend123">GitHub</a>
                <a style={{ marginTop: '10px' }} href='https://www.linkedin.com/in/baylen-doss-6899541bb/'>LinkedIn</a>
              </div>
            </div>

          </div>
          <div className='three'>
            <Route exact path="/" >
              {snakeGame}
            </Route>
          </div>
        </>
      }


    </div>
  );
}

export default App;


