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
  const { noteId, id } = useParams();
  const noteBookId = parseInt(id, 10);
  let focusNote = "";
  // const assignmentFunc = () => {
  const user = useSelector(state => state?.session?.user)
  if (note?.length) {

    focusNote = note?.find((note) => note?.id.toString() === noteId);
  }
  //};
  useEffect(() => {
    dispatch(getNotes(bookId))

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

    if (noteId) {
      dispatch(saveNotes(text, noteBookId, noteId));
    } else {
      const newNoteId = await dispatch(newNote(text, noteBookId));
      history.push(`/notebook/${noteBookId}/note/${newNoteId}`)
    }

  };
  const handleDelete = (id) => {
    dispatch(deleteNote(id))

    history.push(`/notebook/${noteBookId}`)
  }
  const handleEmail = async (text) => {
    console.log()
    await csrfFetch('/api/notes/send-mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    })

  }

  return (
    <div className="note-container three">
      <button onClick={handleSave}>save</button>
      <button onClick={() => handleEmail(text)} className="email"><i class="gg-mail-open"></i></button>
      <button onClick={() => handleDelete(focusNote.id)} className="delete">x</button>
      <CKEditor
        editor={ClassicEditor}
        data={text}

        onChange={(e, editor) => {

          const data = editor.getData();
          setText(data);

        }}
      />
    </div>
  );
};

export default WriteNote;
