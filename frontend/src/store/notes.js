import { csrfFetch } from "./csrf";

const notesLoader = "notes/load";
const noteSaver = "notes/save";
const LOGOUT = 'note/Logout'
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
export const logoutNote =() => async (dispatch) =>{
  dispatch(logout())
}
export const saveNotes = (note, noteBookId, noteId) => async (dispatch) => {
  const body = { note, noteBookId, noteId };
  console.log(body);
  const result = await csrfFetch("/api/notes/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (result.status === 200) {
    const savedNote = result.json();
    console.log(savedNote);
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
  const newNote = result.json();

  dispatch(saveNote(newNote));
};

export const getNotes = (noteBookId) => async (dispatch) => {
  const result = await csrfFetch(`/api/notes/${noteBookId}`);
  if (result.status === 200) {
    const notes = await result.json();

    dispatch(loadNotes(notes));
  }
};
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
      newState.notes.push(action.payload);
      return newState;
    case LOGOUT:
      newState = Object.assign({}, state);
      newState.notes = []
      return newState;
    default:
      return state;
  }
};
export default notesReducer;
