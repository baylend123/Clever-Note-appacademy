import { csrfFetch } from "./csrf";

const notesLoader = "notes/load";
const noteSaver = "notes/save";
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
export const saveNotes = (note, noteBookId, noteId) => async (dispatch) => {
  const body = { note, noteBookId, noteId };

  const result = await csrfFetch("/api/notes/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const savedNote = await result.json();
  console.log(savedNote)
  if (result.status === 200) {

    dispatch(saveNote(savedNote));
  }
};
export const newNote = (note, noteBookId) => async (dispatch) => {
  const body = { note, noteBookId };
  const result = await csrfFetch("/api/notes/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const newNote = await result.json();



  dispatch(saveNote(newNote));
  return newNote.id;
};

export const getNotes = (noteBookId) => async (dispatch) => {
  if (noteBookId === 'all') {
    const result = await csrfFetch('/api/notes/all')
  }
  const result = await csrfFetch(`/api/notes/${noteBookId}`);
  if (result.status === 200) {
    const notes = await result.json();

    dispatch(loadNotes(notes));
  }
};

export const deleteNote = (id) => async (dispatch) => {
  await csrfFetch("/api/notes/delete", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })
  })
  dispatch(noteDelete(id));
}
const initialState = {
  notes: null,
};

const notesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case notesLoader:
      newState = Object.assign({}, state);
      newState.notes = action.payload;
      return newState;
    case noteSaver:
      newState = Object.assign({}, state);
      // newState.notes.push(action.payload);
      newState.notes = newState.notes.filter(note => note.id !== action.payload.id)
      newState.notes = [...newState.notes, action.payload]
      newState.notes = [...newState.notes].sort((a, b) => a.id - b.id)
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
