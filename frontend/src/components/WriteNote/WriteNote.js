import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {RichUtils, Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { saveNotes, newNote } from '../../store/notes';
import './WriteNote.css';

const WriteNote = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { notebookId } = useParams();
  
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  
  
  const notes = useSelector(state => state?.notes)
  let focusNote = notes?.find((note) => note?.id.toString() === noteId);
  
  
  useEffect(() => {
    if (focusNote) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(focusNote.body))))
    }
  }, [focusNote])

  useEffect(() => {console.log('state change')},[editorState])

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if(newState){
      setEditorState(newState)
    }
  }


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
      <button
      onClick={() => setEditorState((prev) => RichUtils.toggleInlineStyle(prev, 'BOLD'))}
      >
        Test Bold
      </button>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
};

export default WriteNote;
