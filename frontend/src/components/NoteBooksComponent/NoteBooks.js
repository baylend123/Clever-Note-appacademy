import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import './NoteBooks.css';
import { getNoteBooks, deleteNotebook } from '../../store/notebook';
import {getNotes} from '../../store/notes';
import NewNotebookModal from '../NewNotebookModal'

const NoteBooksComponent = () => {
  const history = useHistory()

  const [notebookDropDown, setNotebookDropDown] = useState();
  const [notebookSearch, setNotebookSearch] = useState()
  const dispatch = useDispatch();
  let notebooks = useSelector((state) => state?.notebooks);
  let user = useSelector((state) => state?.session?.user)
  let notes = useSelector((state) => state?.notes)
  


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
    
  }
  

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
            <img className='notebook-search-icon' src='https://img.icons8.com/material-outlined/20/000000/search--v1.png' alt='' />
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
              src='https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png'
              onClick={() => setNotebookDropDown(notebookDropDown === notebook.id ? null: notebook.id)}
              alt=''
              />

              <img src='https://img.icons8.com/ios-glyphs/30/000000/spiral-bound-booklet.png' alt=''/>
              {notebook.title}
              {notebookDropDown === notebook.id &&
                <div className='notes-in-notebook-container'>
                  <div
                  className='delete-notebook-container'
                  >
                  <div
                  className='delete-notebook-button'
                  align='right'
                  onClick={() => handleDelete(notebook.id)}
                  >Delete Notebook</div>
                  <div
                  className='create-note-notebook-button'
                  onClick={() => history.push(`/notebook/${notebook.id}/new`)}
                  >Create New Note</div>
                  </div>
                  {notes?.map(note => {
                    return(
                      <div className='notebook-note'
                      onClick={() =>history.push(`/notebook/${notebook.id}/${note.id}`)}
                    >
                      {EditorState.createWithContent(convertFromRaw(JSON.parse(note.body))).getCurrentContent().getPlainText('\u0001')}
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
              src='https://img.icons8.com/material-outlined/24/000000/expand-arrow--v1.png'
              onClick={() => setNotebookDropDown(notebookDropDown === notebook.id ? null: notebook.id)}
                
                alt=''
              />

              <img src='https://img.icons8.com/ios-glyphs/30/000000/spiral-bound-booklet.png' alt=''/>
              {notebook.title}
              {notebookDropDown === notebook.id &&
                <div className='notes-in-notebook-container'>
                  <div
                  className='delete-notebook-container'
                  >
                  <div
                  className='delete-notebook-button'
                  align='right'
                  onClick={() => handleDelete(notebook.id)}
                  >Delete Notebook</div>
                    <div
                  className='create-note-notebook-button'
                  onClick={() => history.push(`/notebook/${notebook.id}/new`)}
                  >Create New Note</div>
                  </div>
                {notebook.Notes?.map(note => {
                  return(
                    <div className='notebook-note'
                    onClick={() =>history.push(`/notebook/${notebook.id}/${note.id}`)}
                    >
                      {EditorState.createWithContent(convertFromRaw(JSON.parse(note.body))).getCurrentContent().getPlainText('\u0001')}
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
