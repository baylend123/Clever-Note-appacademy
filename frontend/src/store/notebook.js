import { csrfFetch } from "./csrf";

const LOADNOTEBOOK = "notebook/LOAD";
const ADDNEWNOTEBOOK = "notebook/ADD";
const LOGOUT = 'notebook/Logout'
const DELETE = 'notebook/delete'



const logout = (notebooks) => {
  return {
    type: LOGOUT,

  };
}
const loadNoteBook = (notebooks) => {
  return {
    type: LOADNOTEBOOK,
    payload: notebooks,
  };
};
const addNewNoteBook = (notebook) => {
  return {
    type: ADDNEWNOTEBOOK,
    payload: notebook,
  };
};
const deleteNoteBook = (id) => {
  return {
    type: DELETE,
    payload: id
  }
}
export const deleteNotebook = (id) => async (dispatch) => {
  const noteBook = csrfFetch('/api/notebooks/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id })

  })

  dispatch(deleteNoteBook(id))
    ('nigga we made it')

}
export const getNoteBooks = () => async (dispatch) => {
  const result = await csrfFetch(`/api/notebooks/`);
  if (result.status === 200) {

    const notebooks = await result.json();

    dispatch(loadNoteBook(notebooks.fatTrimmedNoteBooks));
  }
};
export const addNoteBook = (notebook) => async (dispatch) => {

  const result = await csrfFetch(`/api/notebooks/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notebook),
  });
  const newNoteBook = await result.json();

  dispatch(addNewNoteBook(newNoteBook));
  return newNoteBook.id
};
export const logoutNotebook = () => async (dispatch) => {
  dispatch(logout())
}

const initialState = { notebooks: null };
const noteBooksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOADNOTEBOOK:
      newState = Object.assign({}, state);
      newState.notebooks = action.payload;
      return newState;

    case ADDNEWNOTEBOOK:
      newState = Object.assign({}, state);
      newState.notebooks.push(action.payload);
      return newState;
    case LOGOUT:
      newState = Object.assign({}, state);
      newState.notebooks = []
      return newState;
    case DELETE:
      newState = Object.assign({}, state);
      newState = newState.notebooks.filter(notebook => notebook.id !== action.payload)
      return newState
    default:
      return state;
  }
};
export default noteBooksReducer;
