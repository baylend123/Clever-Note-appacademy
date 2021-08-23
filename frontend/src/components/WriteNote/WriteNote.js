
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { saveNotes, newNote } from '../../store/notes';
import './WriteNote.css';

const WriteNote = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const {notebookId} = useParams();
  let text;
  const notes = useSelector(state => state?.notes)
  let focusNote = notes?.find((note) => note?.id.toString() === noteId);
 
  
  
  let classname = history.location.pathname.includes('notebook') === 'w' ? 'note-container': 'note-container2 two'

  const handleSave = async () => {
    if(noteId === 'new' && notebookId){
      
      dispatch(newNote(text, notebookId))
    }
    else if(!noteId && !notebookId){
      
      dispatch(newNote(text, notebookId))
    }else{

      dispatch(saveNotes(text, noteId));
    }
    
  };


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
