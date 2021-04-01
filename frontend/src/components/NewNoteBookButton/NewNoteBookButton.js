import './NewNoteBookButton.css'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NewNoteBookButton = () => {
    const userState = useSelector(state => state.session.user);
    let newNoteBookButton;
    if (userState) {
        newNoteBookButton = <Link to="/new-notebook" >

            <button className="btn-1"> <i align="center" className="gg-add-r"></i>  <div>New Notebook</div></button >
        </Link >


    }
    return (
        <>
            {newNoteBookButton}
        </>

    )
}
export default NewNoteBookButton