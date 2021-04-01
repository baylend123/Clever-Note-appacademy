import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNoteBook } from "../../store/notebook.js";

const NewNoteBookForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteBook = {
      title,
      tag,
    };
    dispatch(addNoteBook(noteBook));
    history.push("/");
  };

  return (
    <div className="main2">
      <h1 className="sign" align="center">
        Add A New Notebook
      </h1>
      <form className="form1">
        <input
          className="un"
          type="text"
          value={title ? title : ""}
          placeholder="Name Your NoteBook"
          onChange={(e) => setTitle(e.target.value)}
        />
        <h1 className="sign" align="center">
          What is This Notebook for
        </h1>
        <h1 className="sign" align="center">
          Work
        </h1>
        <input
          name="radio"
          className="un"
          type="radio"
          value="Work"
          onChange={(e) => setTag(e.target.value)}
          checked={tag === "Work" ? true : false}
        />
        <h1 className="sign" align="center">
          School
        </h1>
        <input
          className="un"
          type="radio"
          value="School"
          onChange={(e) => setTag(e.target.value)}
          checked={tag === "School" ? true : false}
        />
        <h1 className="sign" align="center">
          Scratch
        </h1>
        <input
          className="un"
          type="radio"
          value="Scratch"
          onChange={(e) => setTag(e.target.value)}
          checked={tag === "Scratch" ? true : false}
        />
        <button className="submit" type="submit" onClick={handleSubmit}>
          Create Notebook
        </button>
      </form>
    </div>
  );
};

export default NewNoteBookForm;
