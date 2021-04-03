import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./NoteBooks.css";
import { getNoteBooks, deleteNotebook } from "../../store/notebook";

const NoteBooksComponent = () => {
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(true);
  const dispatch = useDispatch();
  let notebooks = useSelector((state) => state?.notebooks);
  let user = useSelector((state) => state?.session?.user)
  let state = useSelector((state) => state)
  console.log(state)

  useEffect(() => {
    if (user) {

      dispatch(getNoteBooks());
    }
  }, [dispatch, user, notebooks?.notebooks?.length]);
  const openMenu = () => {
    setShowMenu((prevState) => !prevState);
  };
  const handleDelete = (id) => {
    console.log('here')
    dispatch(deleteNotebook(id))
    history.push('/notebook')
  }



  if (user) {

    return (

      <>
        <div onClick={openMenu} className="notebooks-menu-button">
          <p> Notebooks</p>
        </div>
        {showMenu && (
          <div className="note-books-container">
            {notebooks.notebooks?.map((notebook) => {
              return (
                <div className="book" key={notebook.id}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/notebook/${notebook.id}`}
                  >
                    {notebook.title}
                  </Link>
                  <div className='button-container'>
                    <button className="email"><i class="gg-mail-open"></i></button>
                    <button onClick={() => handleDelete(notebook.id)} className="delete">x</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  } else {
    return null
  }
};
export default NoteBooksComponent;
