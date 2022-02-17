import { useParams, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { getNotes } from '../../store/notes.js';
import WriteNote from '../WriteNote';
import './MainPageNotes.css'

const MainPageNotes = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { id } = useParams();
    const notes = useSelector((state) => state?.notes);
    useEffect(() => {
        dispatch(getNotes('all'))
    }, [ history.location.pathname, dispatch])

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
                                    <div>{ReactHtmlParser(note.body)}</div>
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