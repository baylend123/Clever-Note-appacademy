import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";

import { saveNotes, newNote } from "../../store/notes";
import { getNotes } from "../../store/notes.js";

import "./WriteNote.css";

const WriteNote = ({ note }) => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const { noteId, id } = useParams();
  const noteBookId = parseInt(id, 10);
  let focusNote = "";
 // const assignmentFunc = () => {
 console.log('-=---0-0932-04932-049023', note)   
 if (note?.length) {
      
      focusNote = note?.find((note) => note?.id.toString() === noteId);
    }
  //};
  useEffect(() => {

   const pathname = history.location.pathname.split("/");
   const endOfPath = pathname[pathname.length - 1]
  
    if(endOfPath !== 'new-note'){

      setText(focusNote.body)
    }
    return () => {
      //handleSave()
    }
    
  },[history.location.pathname]);
  
  const [text, setText] = useState(focusNote.body);
  
  const handleSave = () => {
    
    if (noteId) {
      dispatch(saveNotes(text, noteBookId, noteId));
    } else {
      dispatch(newNote(text, noteBookId));
    }
   
  };
 
  return (
    <div className="note-container">
      <button onClick={handleSave}>save</button>
      <button className="email"><i class="gg-mail-open"></i></button>
                <button className="delete">x</button>
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
