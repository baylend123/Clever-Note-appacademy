import { useParams, Link, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getNotes } from "../../store/notes.js";
import WriteNote from "../WriteNote";
import "./NoteComponent.css";

const NoteComponent = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const notes = useSelector((state) => state?.notes);

  useEffect(() => {
    dispatch(getNotes(id));
  }, [id, dispatch]);

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
        {notes.notes?.map((note) => {
          const preview = note.body.slice(0, 10);
          return (
            <Link to={`/notebook/${id}/note/${note.id}`}>
              <div className="note" key={note}>
                <div className="note-content">{preview + `. . .`}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <Route path="/notebook/:id/new-note">
        <WriteNote note={[]} />
      </Route>
      <Route path="/notebook/:id/note/:noteId">
        <WriteNote note={notes?.notes} />
      </Route>
    </>
  );
};
export default NoteComponent;
