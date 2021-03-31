import { csrfFetch } from './csrf';

const LOADNOTEBOOK = 'notebook/LOAD'


const loadNoteBook = (notebooks) => {
    return {

        type: LOADNOTEBOOK,
        payload: notebooks
    }
}

export const getNoteBooks = (userId) => async dispatch => {


    console.log('thunk')
    const id = userId.toString();
    const result = await csrfFetch(`/api/notebooks/${id}`)
    if (result.status === 200) {
        console.log('OK')
        dispatch(loadNoteBook(result))
    }



}

const notebooksReducer = (state = {}, action) => {
    switch (action) {
        case LOADNOTEBOOK:
            return { ...state, notebooks: action.payload }
        default:
            return state

    }
}
export default notebooksReducer

