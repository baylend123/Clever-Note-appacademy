import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Sidebar from "./components/Sidebar";
import NoteComponent from "./components/NoteComponent";
import NewNoteBookForm from "./components/NewNoteBookForm";
import * as sessionActions from "./store/session";
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
    </div>
  );
}

export default App;


