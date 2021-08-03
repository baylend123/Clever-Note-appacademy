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
  let focusNote = "";
  let text;
  const user = useSelector(state => state?.session?.user)
  if (note?.length) {
    focusNote = note?.find((note) => note?.id.toString() === noteId);
    console.log(focusNote)
  }

  const handleSave = async () => {
    dispatch(saveNotes(text, noteId));
  };
  let timer;

  return (
    <div className="note-container"
      onKeyUp={() => {
        console.log("up")
        timer = setTimeout(() => {
          handleSave()
        }, 1500)
      }
      }
      onKeyDown={() => {
        console.log('down')
        clearTimeout(timer)
      }}
    >
      <CKEditor
        editor={ClassicEditor}
        data={focusNote.body}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log(data)
          text = data

        }}
      />
    </div>
  );
};

export default WriteNote;
