import { useParams, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { parse } from 'node-html-parser';


import { getNotes, deleteNote } from '../../store/notes.js';
import WriteNote from '../WriteNote';
import './MainPageNotes.css'

const MainPageNotes = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { id } = useParams();
    const notes = useSelector((state) => state?.notes);
    useEffect(() => {
        dispatch(getNotes('all'))
    }, [getNotes, deleteNote, history.location.pathname])

    return (
        <>
            <div className='notes-container-home'>
                {notes?.map((note) => {

                    return (
                        <>
                            <div key={note.id}>
                                <div className={`note-page`} key={note}
                                    onClick={() => {
                                        history.push(`/notes/${note.id}`)
                                    }}
                                >
                                    <div>{note.body}</div>
                                </div>
                            </div>
                        </>
                    );
                }

                )}
            </div>
            <Route path='/notes/:noteId'>
                <WriteNote bookId={id} note={notes?.notes} />
            </Route>
        </>
    );
};

export default MainPageNotes