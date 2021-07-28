import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { csrfFetch } from '../../store/csrf'



import { saveNotes, newNote, deleteNote, getNotes } from "../../store/notes";


import "./WriteNote.css";

const WriteNote = ({ note, bookId }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { noteId } = useParams();
  // console.log(noteId)
  // const noteBookId = parseInt(id, 10);
  let focusNote = "";
  // const assignmentFunc = () => {
  const user = useSelector(state => state?.session?.user)
  if (note?.length) {

    focusNote = note?.find((note) => note?.id.toString() === noteId);
    // console.log(focusNote)
  }
  //};
  useEffect(() => {
    // dispatch(getNotes(bookId))

    const pathname = history.location.pathname.split("/");
    const endOfPath = pathname[pathname.length - 1]

    if (endOfPath !== 'new-note') {

      setText(focusNote.body)
    }
    return () => {
      //handleSave()
    }

  }, [history.location.pathname]);

  const [text, setText] = useState(focusNote?.body);

  const handleSave = async () => {

    // if (noteId) {
    console.log(noteId);
    dispatch(saveNotes(text, noteId));
    // } else {
    //   const newNoteId = await dispatch(newNote(text, noteBookId));
    //   history.push(`/notebook/${noteBookId}/note/${newNoteId}`)
    // }

  };
  const handleDelete = (id) => {
    //   dispatch(deleteNote(id))

    //   history.push(`/notebook/${noteBookId}`)
  }


  return (
    <div className="note-container">
      <button onClick={handleSave}>save</button>
      <button onClick={() => handleDelete(focusNote.id)} className="delete">x</button>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(event, editor)
          setText(data);

        }}
      />
    </div>
  );
};

export default WriteNote;
