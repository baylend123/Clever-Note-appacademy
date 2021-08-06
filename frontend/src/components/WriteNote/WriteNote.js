import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { csrfFetch } from '../../store/csrf'
import { saveNotes, newNote, deleteNote, getNotes } from '../../store/notes';
import './WriteNote.css';

const WriteNote = ({ note, bookId }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const {notebookId} = useParams();
  let text;
  const notes = useSelector(state => state?.notes)
  let focusNote = notes?.find((note) => note?.id.toString() === noteId);
  const user = useSelector(state => state?.session?.user)
  
  
  let classname = history.location.pathname.includes('notebook') === 'w' ? 'note-container': 'note-container2 two'

  const handleSave = async () => {
    if(noteId === 'new' && notebookId){
      console.log('here')
      dispatch(newNote(text, notebookId))
    }
    else if(!noteId && !notebookId){
      console.log("newNote")
      dispatch(newNote(text, notebookId))
    }else{

      dispatch(saveNotes(text, noteId));
    }
    
  };
  let timer;

  return (
    <div className={`${classname}`}

    >
    <button
    onClick={handleSave}
    className='save-note-button'
    >
      Save Your Note
    </button>
      <CKEditor
        editor={ClassicEditor}
        data={focusNote?.body}
        onChange={(event, editor) => {
          const data = editor.getData();
          
          text = data

        }}
      />
    </div>
  );
};

export default WriteNote;
