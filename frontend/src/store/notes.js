import { csrfFetch } from './csrf';

const notesLoader = 'notes/load'

const loadNotes = (notes) => {

    return {
        type: notesLoader,
        payload: notes
    }

}


export const getNotes = (noteBookId) => async dispatch => {
    const result = await csrfFetch(`/api/notes/${noteBookId}`)
    if (result.status === 200) {
        const notes = await result.json()

        dispatch(loadNotes(notes))
    }

}
const initialState = {
    notes: null
}

const notesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case notesLoader:
            newState = Object.assign({}, state);
            newState.notes = action.payload
            return newState
        default:
            return state
    }

}
export default notesReducer