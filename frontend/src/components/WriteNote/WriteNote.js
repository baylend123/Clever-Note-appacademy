import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

import { saveNotes } from "../../store/notes";

import "./WriteNote.css";

const WriteNote = ({ note }) => {
  const dispatch = useDispatch();
  const { noteId, id } = useParams();
  const noteBookId = parseInt(id, 10);

  let focusNote = "";
  if (note?.length) {
    focusNote = note.find((note) => note.id.toString() === noteId);
  }

  const [text, setText] = useState(focusNote.body);

  const handleSave = () => {
    console.log(noteId);
    dispatch(saveNotes(text, noteBookId, noteId));
  };

  return (
    <div className="note-container">
      <button onClick={handleSave}>save</button>
      <CKEditor
        editor={ClassicEditor}
        data={text}
        onChange={(e, editor) => {
          const data = editor.getData();
          setText(data);
          console.log(text);
        }}
      />
    </div>
  );
};

export default WriteNote;
