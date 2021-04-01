import { csrfFetch } from "./csrf";

const LOADNOTEBOOK = "notebook/LOAD";

const loadNoteBook = (notebooks) => {
  return {
    type: LOADNOTEBOOK,
    payload: notebooks,
  };
};

export const getNoteBooks = () => async (dispatch) => {
  const result = await csrfFetch(`/api/notebooks/`);
  if (result.status === 200) {
    console.log("OK");
    const notebooks = await result.json();

    dispatch(loadNoteBook(notebooks.fatTrimmedNoteBooks));
  }
};
export const addNoteBook = (notebook) => async (dispatch) => {
  console.log(notebook);
  const result = await csrfFetch(`/api/notebooks/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notebook),
  });
  const newNoteBook = await result.json();
  dispatch(loadNoteBook(newNoteBook));
};

const initialState = { notebooks: null };
const noteBooksReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOADNOTEBOOK:
      newState = Object.assign({}, state);
      newState.notebooks = action.payload;
      return newState;
    default:
      return state;
  }
};
export default noteBooksReducer;
