import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

import { saveNotes, newNote } from "../../store/notes";

import "./WriteNote.css";

const WriteNote = ({ note }) => {
  console.log(note);
  const history = useHistory();
  const dispatch = useDispatch();
  const { noteId, id } = useParams();
  const noteBookId = parseInt(id, 10);
  let focusNote = "";
 // const assignmentFunc = () => {
    if (note?.length) {
      focusNote = note.find((note) => note.id.toString() === noteId);
    }
  //};
  useEffect(() => {
   console.log()
   const pathname = history.location.pathname.split("/");
   const endOfPath = pathname[pathname.length - 1]
   console.log(endOfPath);
    if(endOfPath !== 'new-note'){

      setText(focusNote.body)
    }
    return () => {
      //handleSave()
    }
    
  },[history.location.pathname]);

  const [text, setText] = useState(focusNote.body);

  const handleSave = () => {
    console.log(history.location.pathname);
    if (noteId) {
      dispatch(saveNotes(text, noteBookId, noteId));
    } else {
      dispatch(newNote(text, noteBookId));
    }
   
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
