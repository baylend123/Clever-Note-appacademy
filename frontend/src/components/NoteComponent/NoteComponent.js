import { useParams, Link, Route, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { parse } from 'node-html-parser';


import { getNotes, deleteNote } from "../../store/notes.js";
import WriteNote from "../WriteNote";
import "./NoteComponent.css";

const NoteComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [containerCSS, setContainerCSS] = useState('notes-container')
  const [individualCSS, setIndividualCSS] = useState('note')
  const state = useSelector(state => state)
  const { id } = useParams();
  const notes = useSelector((state) => state?.notes);
  const clicked = () => {
    return
  }

  useEffect(() => {
    console.log(notes)
    if (!notes.notes) {

      if (history.location.pathname !== '/') {

        dispatch(getNotes('all'));
      } else {
        setContainerCSS('notes-container-home')
        dispatch(getNotes('all'))
      }
      if (history.location.pathname === '/notes') {
        setContainerCSS('notes-container-page')
        setIndividualCSS('note-page')
      }
    }
    if (history.location.pathname === '/notes') {
      setIndividualCSS('note-page')
      setContainerCSS('notes-container-page')
    } else if (history.location.pathname === '/') {
      setContainerCSS('notes-container-home')
    }
  }, [getNotes, deleteNote, history.location.pathname])

  return (
    <>
      <div className={`${containerCSS}`}>
        <div className='note-page-header'>
          <img src="https://img.icons8.com/material-rounded/48/000000/note.png" />
          <div>Notes</div>
        </div>
        <div className='note-page-count'>
          {notes?.notes?.length} notes
        </div>
        {notes?.notes?.map((note) => {
          if (note.body !== undefined && note.body.length > 0) {
            console.log(note.body)

            const previewSplit = parse(note?.body ? note.body : '');
            const realPreview = previewSplit.childNodes[0].childNodes[0]?.rawText
            let actualRealPreview
            if (!realPreview) {
              actualRealPreview = note?.body?.slice(0, 1000)
            } else {

              actualRealPreview = realPreview.slice(0, 1000)
            }
            return (
              <>
                <div key={note.id} onLoad={clicked}>
                  <div className={`${individualCSS}`} key={note}
                    onClick={() => {
                      history.push(`/notes/${note.id}`)
                    }}
                  >
                    <div className="note-content">{actualRealPreview}</div>
                  </div>
                </div>
                <div className="note-page-edit">Last Edited {note.updatedAt.slice(0, 10)}</div>
              </>
            );
          }
          return null
        })}
      </div>
      <Route path="/notebook/:id/new-note">
        <WriteNote note={[]} />
      </Route>
      <Route path="/notes/:noteId">
        <WriteNote bookId={id} note={notes?.notes} />
      </Route>
    </>
  );
};
export default NoteComponent;
