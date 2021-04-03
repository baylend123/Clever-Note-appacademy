import { useParams, Link, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { parse } from 'node-html-parser';


import { getNotes, deleteNote } from "../../store/notes.js";
import WriteNote from "../WriteNote";
import "./NoteComponent.css";

const NoteComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const { id } = useParams();
  const notes = useSelector((state) => state?.notes);
  const clicked = () => {
    return
  }

  useEffect(() => {
    dispatch(getNotes(id));
  }, [getNotes, notes?.notes?.length, deleteNote, history.location.pathname])

  //         < WriteNote note = {{ }} />
  //     < WriteNote note = { notes.notes } />
  return (
    <>
      <div className="notes-container two">
        <Link to={`/notebook/${id}/new-note`}>
          <div className="note">
            <div className="note-content">
              <div class="plus alt"></div>
            </div>
          </div>
        </Link>
        {notes?.notes?.map((note) => {
          if (note.body !== undefined) {


            const previewSplit = parse(note?.body ? note.body : '');
            const realPreview = previewSplit.childNodes[0].childNodes[0].rawText
            const actualRealPreview = realPreview.slice(0, 20)
            return (
              <Link to={`/notebook/${id}/note/${note.id}`} onLoad={clicked}>
                <div className="note" key={note}>
                  <div className="note-content">{actualRealPreview + `. . .`}</div>
                </div>
              </Link>
            );
          }
          return null
        })}
      </div>
      <Route path="/notebook/:id/new-note">
        <WriteNote note={[]} />
      </Route>
      <Route path="/notebook/:id/note/:noteId">
        <WriteNote bookId={id} note={notes?.notes} />
      </Route>
    </>
  );
};
export default NoteComponent;
