import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {RichUtils, Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { saveNotes, newNote } from '../../store/notes';
import './WriteNote.css';
import { useQuill } from 'react-quilljs';
import { handleSave } from './saveUtils';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const WriteNote =  () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { notebookId } = useParams();

  const selectedNote = useSelector(state => state.notes.find(el => el.id === parseInt(noteId)))
  const theme = 'snow';
  // const theme = 'bubble';

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
    ],
  };


  const placeholder = 'Compose an epic...';

  const formats = ['bold', 'italic', 'underline', 'strike'];

  const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder });

  let HTMLcontent;

  useEffect(() => {
    if (quill) {
      if(selectedNote){
        quill.root.innerHTML = selectedNote.body
      }
      quill.on('text-change', (delta, oldDelta, source) => {
        HTMLcontent = quill.root.innerHTML
      });
    }
  }, [quill, selectedNote])


  return (
    <div style={{ backgroundColor:'white', width: '60vw', height: 'auto', border: '1px solid lightgray' }}>
      <div 
      ref={quillRef} />
      <button
      onClick={() => handleSave(HTMLcontent, dispatch, newNote, saveNotes, notebookId, noteId)}
      >
        Test save
      </button>
    </div>
  );
};
export default WriteNote;
