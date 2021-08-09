import { useParams, Link, Route, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { parse } from 'node-html-parser';


import { getNotes, deleteNote } from '../../store/notes.js';
import WriteNote from '../WriteNote';
import './NoteComponent.css';

const NoteComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id)
  const notes = useSelector((state) => state?.notes);
  const clicked = () => {
    return
  }
  console.log(notes.length)
  const handleDelete = (id) => {
    dispatch(deleteNote(id));
    history.push('/notes')
  }

  useEffect(() => {
    dispatch(getNotes('all'))
  }, [])

  return (
    <>
      <div className='notes-container-page'>
        <div className='note-page-header'>
          <img src='https://img.icons8.com/material-rounded/48/000000/note.png' />
          <div>Notes</div>
        </div>
        <div className='note-page-count'>
          {notes?.length} notes
        </div>
        {notes?.map((note) => {

          return (
            <>
              <div key={note?.id} onLoad={clicked}>
                <img className='delete-note-button' align='right' src='https://img.icons8.com/windows/20/000000/xbox-x.png'
                  onClick={() => {
                    handleDelete(note?.id) 
                  }
                  }
                />
                <div className='note-page' key={note}
                  onClick={() => {
                    history.push(`/notes/${note?.id}`)
                  }}
                >
                  <div className='note-content'>{note?.body}</div>
                </div>
              </div>
              <div className='note-page-edit'>Last Edited {note?.updatedAt.slice(0, 10)}</div>
            </>
          );
        }

        )}
      </div>
      <Route path='/notebook/:id/new-note'>
        <WriteNote note={[]} />
      </Route>
      <Route path='/notes/:noteId'>
        <WriteNote bookId={id} note={notes?.notes} />
      </Route>
    </>
  );
};
export default NoteComponent;
