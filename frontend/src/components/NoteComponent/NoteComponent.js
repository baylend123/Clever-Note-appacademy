import { useParams, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';



import { getNotes, deleteNote } from '../../store/notes.js';
import WriteNote from '../WriteNote';
import './NoteComponent.css';

const NoteComponent = () => {

  const history = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams();
  const notes = useSelector((state) => state?.notes);
  useEffect(() => {
    dispatch(getNotes('all'))
  }, [dispatch])

  return (
    <>
      <div className='notes-container-page'>
        <div className='note-page-header'>
          <div className='notes-header-text'>

            <img className='notes-header-image' src='https://img.icons8.com/material-rounded/48/000000/note.png' alt='' />
            <div>Notes</div>
          </div>
          <div className='note-page-count'>
            {notes?.length} notes
          </div>
        </div>
        {notes?.map((note) => {

          return (

            <div className={parseInt(id, 10) === note.id ? 'note-page-active' : 'note-page'} key={note.id}
              onClick={() => {
                history.push(`/notes/${note?.id}`)
              }}
            >
              {note.body}
              <div className='note-page-edit'>Last Edited {note?.updatedAt.slice(0, 10)}</div>
            </div>

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
