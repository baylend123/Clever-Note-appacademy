import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './NoteBooks.css'
import { getNoteBooks } from '../../store/notebook'


const NoteBooksComponent = () => {
    const dispatch = useDispatch()
    let userState = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(getNoteBooks(userState.id))
    })

    return (
        <div className="note-books-container">
            <h1>NoteBooksComponent</h1>
        </div>
    )
}
export default NoteBooksComponent