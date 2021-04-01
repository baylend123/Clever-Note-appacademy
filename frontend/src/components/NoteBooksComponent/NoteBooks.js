import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./NoteBooks.css";
import { getNoteBooks } from "../../store/notebook";

const NoteBooksComponent = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  let notebooks = useSelector((state) => state?.notebooks);

  useEffect(() => {
    dispatch(getNoteBooks());
  }, [dispatch]);
  const openMenu = () => {
    setShowMenu((prevState) => !prevState);
  };
  console.log(notebooks);
  return (
    <>
      <div onClick={openMenu} className="notebooks-menu-button">
        <p> Notebooks</p>
      </div>
      {showMenu && (
        <div className="note-books-container">
          {notebooks &&
            notebooks.notebooks.map((notebook) => {
              return (
                <div className="book" key={notebook.id}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/notebook/${notebook.id}`}
                  >
                    {notebook.title}
                  </Link>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
export default NoteBooksComponent;
