import { useParams, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation.js';
import { getNotes } from '../../store/notes.js';
import WriteNote from '../WriteNote';
import { Editor, EditorState, convertToRaw, convertFromHTML, convertFromRaw } from 'draft-js';
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
                {notes ? notes.map((note) => {

                    return (
                        <>
                            <div key={note.id}>
                                <div className={`note-page`} key={note}
                                    onClick={() => {
                                        history.push(`/notes/${note.id}`)
                                    }}
                                >
                                    <div>{EditorState.createWithContent(convertFromRaw(JSON.parse(note.body))).getCurrentContent().getPlainText('\u0001')}</div>
                                </div>
                            </div>
                        </>
                    );
                }

                ) : <LoadingAnimation />}
            </div>
            <Route path='/notes/:noteId'>
                <WriteNote bookId={id} note={notes?.notes} />
            </Route>
        </>
    );
};

export default MainPageNotes