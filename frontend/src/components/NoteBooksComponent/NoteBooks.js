import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./NoteBooks.css";
import { getNoteBooks, deleteNotebook } from "../../store/notebook";
import {getNotes} from "../../store/notes";
import NewNotebookModal from '../NewNotebookModal'

const NoteBooksComponent = () => {
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(true);
  const [notebookDropDown, setNotebookDropDown] = useState();
  const [notebookSearch, setNotebookSearch] = useState()
  const dispatch = useDispatch();
  let notebooks = useSelector((state) => state?.notebooks?.notebooks);
  let user = useSelector((state) => state?.session?.user)
  let notes = useSelector((state) => state?.notes?.notes)


  useEffect(() => {
    if (user) {

      dispatch(getNoteBooks());
    }
  }, [dispatch, user, notebooks?.notebooks?.length]);
  
  const handleNoteBookNotes = (id) => {
    dispatch(getNotes(id))
  }

  const handleDelete = (id) => {
    dispatch(deleteNotebook(id))
    history.push('/notebook')
  }
  console.log(notebookSearch)

  if (user) {

    return (

      <div className='notebooks-page-container'>
        <div className='notebooks-header'>
          <div
            className='notebook-text'
          >Notebooks
          </div>
          <div
            className='search-container'
          >
            <input className='notebook-search'
              placeholder='Find Notebooks...'
              onChange={
                (e) => {
                  let notebookSearcher = notebooks.filter((notebook) => {
                    if(notebook.title.includes(e.target.value)){
                      return notebook
                    }
                  })
                  setNotebookSearch(notebookSearcher)
                }
              }
            >
            </input>
            <img className='notebook-search-icon' src="https://img.icons8.com/material-outlined/20/000000/search--v1.png" />
          </div>
        </div>



        <div className='notebook-number-new-container'>
            <div className='notebook-number'>
              {notebooks?.length} Notebooks
            </div>
            <div className='new-notebook-button'>
              <NewNotebookModal/>
            </div>
        </div>

        <div className='notebook-spacer'>
        </div>
        <div className='notebook-title-text'>
          Title
        </div>

        <div className='notebooks-container'>
          {notebookSearch ? notebookSearch.map(notebook => {
            return(
              <div className='individual-notebook-container'>
              <img 
              className={notebookDropDown === notebook.id ? 'notebook-dropdown':'notebook-dropdown-start'} 
              src="https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png"
              onClick={() => setNotebookDropDown(notebookDropDown === notebook.id ? null: notebook.id)}

              />

              <img src="https://img.icons8.com/ios-glyphs/30/000000/spiral-bound-booklet.png"/>
              {notebook.title}
              {notebookDropDown === notebook.id &&
                <div className='notes-in-notebook-container'>
                  {notes?.map(note => {
                    return(
                      <div className='notebook-note'
                      onClick={() =>history.push(`/notes/${note.id}`)}
                    >
                      {note.body.slice(0,500)}
                    </div>
                    )
                  })}
                </div>
              }
              </div>
            )
          }) : notebooks?.map(notebook => {
            return(
              <div className='individual-notebook-container'>
              <img 
              className={notebookDropDown === notebook.id ? 'notebook-dropdown':'notebook-dropdown-start'} 
              src="https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png"
              onClick={() => {setNotebookDropDown(notebookDropDown === notebook.id ? null: notebook.id)
                handleNoteBookNotes(notebook.id)}
              }

              />

              <img src="https://img.icons8.com/ios-glyphs/30/000000/spiral-bound-booklet.png"/>
              {notebook.title}
              {notebookDropDown === notebook.id &&
                <div className='notes-in-notebook-container'>
                {notes?.map(note => {
                  return(
                    <div className='notebook-note'
                      onClick={() =>history.push(`/notes/${note.id}`)}
                    >
                      {note.body.slice(0,500)}
                    </div>
                  )
                })}
              </div>
              }
              </div>
            )
          })}
        </div>
      </div>
    
    );
  } else {
    return null
  }
};
export default NoteBooksComponent;
