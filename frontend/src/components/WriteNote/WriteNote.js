import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Editor, EditorState, convertToRaw, convertFromHTML, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { saveNotes, newNote } from '../../store/notes';
import './WriteNote.css';

const WriteNote = () => {
  const { noteId } = useParams();
  const { notebookId } = useParams();
  const notes = useSelector(state => state?.notes)
  let focusNote = notes?.find((note) => note?.id.toString() === noteId);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const dispatch = useDispatch();
  useEffect(() => {
    if (focusNote) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(focusNote.body))))
    }
  }, [focusNote])
  const handleSave = async () => {
    if (noteId === 'new' && notebookId) {

      dispatch(newNote(editorState, notebookId))
    }
    else if (!noteId && !notebookId) {

      dispatch(newNote(convertToRaw(editorState.getCurrentContent()), notebookId))
    } else {

      dispatch(saveNotes(convertToRaw(editorState.getCurrentContent()), noteId));
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
        <Editor
          editorState={editorState}
          onChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default WriteNote;
