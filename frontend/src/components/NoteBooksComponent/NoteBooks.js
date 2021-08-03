import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./NoteBooks.css";
import { getNoteBooks, deleteNotebook } from "../../store/notebook";

const NoteBooksComponent = () => {
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(true);
  const dispatch = useDispatch();
  let notebooks = useSelector((state) => state?.notebooks?.notebooks);
  let user = useSelector((state) => state?.session?.user)
  let state = useSelector((state) => state)


  useEffect(() => {
    if (user) {

      dispatch(getNoteBooks());
    }
  }, [dispatch, user, notebooks?.notebooks?.length]);
  console.log(notebooks)
  const openMenu = () => {
    setShowMenu((prevState) => !prevState);
  };
  const handleDelete = (id) => {
    dispatch(deleteNotebook(id))
    history.push('/notebook')
  }



  if (user) {

    return (

      <div className='notebooks-page-container'>
        <div className='notebooks-header'>
          <div
            className='notebook-text'
          >Notebooks
          </div>
          <div
            className='search-container'
          >
            <input className='notebook-search'
              placeholder='Find Notebooks...'
            >
            </input>
            <img className='notebook-search-icon' src="https://img.icons8.com/material-outlined/20/000000/search--v1.png" />
          </div>
        </div>



        <div className='notebook-number-new-container'>
            <div className='notebook-number'>
              {notebooks?.length} Notebooks
            </div>
            <div className='new-notebook-button'>
                <div className='new-notebook-text'>
                <img className='new-notebook-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADpUlEQVRoge2a32tbZRjHP885TVvasEoFccLcHA6iJFFMini3TpxCwVQhu/FysptR1nStiniRG5nKWMt+MJj6DzQXNrus4OqdmBPE1Mwfu6hjQ5ExNVSK8yR5vEgiXZslTZr1PY58b3LenOf98eH7Pu95X86BrrwlaXQz7CT0PvX7gw89lI3O/dqpBq1ONdSiAi7yRcSZ3N2pBrfkSC462zCuFW1wuWPOmHIE0O+AgAuL4W+nH9lua8ZAbKt0CFgGCeKWvtzuNDMG8s1z527ZVvFFYJkO5IzBqdVZGKMg0DkY4yDQGRhPgMD2YTwDAtuD8RQItA/jORBoD6ZnZ4a2Wc02pKXyXcWAC4tA6F7xnnSkviTY6O6OO9LOBnQrx4n/kSON1QXxmtrOkft1DG73ENd1pJPH307ogXGkC+I1dVctr+mBWbWMbePrKeIc87k6EBOxxhWNAHsAX+1+yJmK9/LXQjZ6yd1Y1zNTK5RJxFwG84ikFH0DCACDQG8tRtB5l8GfwpmpVzfWNw+iSSvkJE6JsAAcAPKIJKRMEJ/tx2f7pUxQlSmFq8A+RNPhTOIjNPnf+Hdk1WqUT6Fs4X2Bd4B/VDkZWLl5MXUkVdoQlgfy8fn42R/37zkOehphJuwUyMFbYNiRUCYRE3ibCsTY8sjs+fUQ4exkOuwkFmrl1JFUKRc9c7as1hjgIszUptmOv1aoKeIc87kM5oEDqkwsj8yeb6X/sJM4AcwB14dXh5405oirAzGqORFYuXmx1frDq0MXgO+BvX/sKrxubmqJvFa9+rhOTjTV0miyKMgnAKrETOZIBMC2rM/bbUC1uFi9et7kA/ExgLU1+wZUEhuVTc8HqLtCpnPR2fE7d/qv9/W7gDxq0pG7+1bZ8nIubIotm3TkN2B/f6/7OJDPRWfHNwY0WzX7+v7eCzbALyYd+QqgLBxuuwWxXqn88rUxEEUWqoN4Mz4ft1utf/BKsgfkKABlvWwM5OHVXZ8BKwJPV7Ydrem2vzBBZWN5zSdraWMgS6PJooVOVEp6Opg5+VKdsLTUnFunZ5zEYRE+BBSV6Wz0kmvqW5R6coGZ4dWhC0ujyWK9gINXkj23/YWJKoQP9FQuOvcumPuo5p5SuGohn6oWF0sDxZ8B7LWefSL2ywpHgacqYfpBLvLQe0iyDE1AdlLPOpNjZeQc8EST0GuoTOdGzlxe/6dnQKAydX73/zmuSExEXwDZDZSBG6pkBU37ZC1d76j7L8UGga4fK6w4AAAAAElFTkSuQmCC" />
                New Notebook
                </div>
            </div>
        </div>

        <div className='notebook-spacer'>
        </div>
        <div className='notebook-title-text'>
          Title
        </div>

        <div className='notebooks-container'>
          {notebooks.map(notebook => {
            return(
              <div className='individual-notebook-container'>
              <img src="https://img.icons8.com/ios-glyphs/30/000000/spiral-bound-booklet.png"/>
              {notebook.title}
              </div>
            )
          })}

        </div>

      </div>
    
    );
  } else {
    return null
  }
};
export default NoteBooksComponent;
