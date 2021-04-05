import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Sidebar from "./components/Sidebar";
import NoteComponent from "./components/NoteComponent";
import NewNoteBookForm from "./components/NewNoteBookForm";
import WriteNote from "./components/WriteNote";
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
    history.push(`/notebook/${numby}/note/new-note`)
  }
  return (
    <div className='main-container'>
      <Sidebar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/new-notebook">
            <NewNoteBookForm />
          </Route>
          <Route path="/notebook/:id">
            <NoteComponent />
          </Route>
        </Switch>


      )}
      {!user &&
        <>
          <div className='two'>
            <img src='https://i.ibb.co/h2YN9vv/Clever-Note-1.png'></img>
            <h1 className='DemoUserHeader' align='center'>Click Here to Log In As Demo-User</h1>
            <div align='right'>
              <button onClick={demoUser} align='right' className="DemoUserButton">Demo User</button>
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


