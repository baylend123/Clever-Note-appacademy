import { csrfFetch } from './csrf';

const LOADNOTEBOOK = 'notebook/LOAD'


const loadNoteBook = (notebooks) => {
    return {

        type: LOADNOTEBOOK,
        payload: notebooks
    }
}

export const getNoteBooks = () => async dispatch => {

    const result = await csrfFetch(`/api/notebooks/`)
    if (result.status === 200) {
        console.log('OK')
        const notebooks = await result.json()

        dispatch(loadNoteBook(notebooks.fatTrimmedNoteBooks))

    }



}

const initialState = { notebooks: null }
const noteBooksReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case LOADNOTEBOOK:
            newState = Object.assign({}, state);
            newState.notebooks = action.payload
            return newState
        default:
            return state

    }
}
export default noteBooksReducer

