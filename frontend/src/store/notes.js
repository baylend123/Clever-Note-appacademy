import { node } from 'prop-types';
import { csrfFetch } from './csrf';

const notesLoader = 'notes/load';
const noteSaver = 'notes/save';
const LOGOUT = 'note/Logout'
const DELETE = 'note/Delete'
const logout = () => {
  return {
    type: LOGOUT,

  };
}


const loadNotes = (notes) => {
  return {
    type: notesLoader,
    payload: notes,
  };
};
const saveNote = (note) => {
  return {
    type: noteSaver,
    payload: note,
  };
};

const noteDelete = (id) => {
  return {
    type: DELETE,
    payload: id
  }
}


export const logoutNote = () => async (dispatch) => {
  dispatch(logout())
}
export const saveNotes = (note, noteId) => async (dispatch) => {

  const body = { note, noteId };

  let result = await csrfFetch('/api/notes/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  let savedNote = await result.json()
    console.log(savedNote)
  dispatch(saveNote(savedNote))
};
export const newNote = (note, noteBookId) => async (dispatch) => {
  const body = { note, noteBookId };
  const result = await csrfFetch('/api/notes/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const newNote = await result.json();
  console.log(newNote)


  dispatch(saveNote(newNote));
  return newNote.id;
};

export const getNotes = (noteBookId) => async (dispatch) => {
  if (noteBookId === 'all') {
    const result = await csrfFetch('/api/notes/all')
    if (result.status === 200) {
      const notes = await result.json();
      console.log(notes)
      dispatch(loadNotes(notes));
    }
  }else{
  const result = await csrfFetch(`/api/notes/${noteBookId}`);
  if (result.status === 200) {
    const notes = await result.json();
    console.log(notes)
    dispatch(loadNotes(notes));
  }
}
};

export const deleteNote = (id) => async (dispatch) => {
  
  await csrfFetch('/api/notes/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })
  dispatch(noteDelete(id));
}
const initialState = []

const notesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case notesLoader:
      newState = [...action.payload]
      return newState;
    case noteSaver:
      newState = [...state]
      newState.map((note,idx) => {
        if( note.id === action.payload.id){
          newState[idx] = action.payload
        }
      })
      return newState;
    case LOGOUT:
      newState = Object.assign({}, state);
      newState.notes = []
      return newState;
    case DELETE:
      newState = Object.assign({}, state);
      newState = newState.notes.filter(note => note.id !== action.payload)
      return newState;
    default:
      return state;
  }
};
export default notesReducer;
