import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { saveNotes, newNote } from '../../store/notes';
import './WriteNote.css';

const WriteNote = () => {
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const notes = useSelector(state => state?.notes)
  let focusNote = notes?.find((note) => note?.id.toString() === noteId);
  const [editorState, setEditorState] = useState(
    focusNote ? focusNote : 
    () => EditorState.createEmpty(),
  );
  console.log(editorState)
  const history = useHistory();
  const dispatch = useDispatch();
  let text;
  const handleSave = async () => {
    if (noteId === 'new' && notebookId) {

      dispatch(newNote(editorState, notebookId))
    }
    else if (!noteId && !notebookId) {

      dispatch(newNote(text, notebookId))
    } else {

      dispatch(saveNotes(text, noteId));
    }

  };


  return (
    <div className='note-container'

    >
      <button
        onClick={handleSave}
        className='save-note-button'
      >
        Save Your Note
      </button>
      <div className='text-editor'>
        <Editor editorState={editorState} onChange={setEditorState} />
        {/* <CKEditor
          editor={ClassicEditor}
          data={focusNote?.body}
          onChange={(event, editor) => {
            const data = editor.getData();

            text = `<div>${{data}}<div>`

          }} */}
        {/* /> */}
      </div>
    </div>
  );
};

export default WriteNote;
