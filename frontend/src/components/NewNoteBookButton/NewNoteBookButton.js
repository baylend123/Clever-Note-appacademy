import './NewNoteBookButton.css'

import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const NewNoteBookButton = () => {
    const userState = useSelector(state => state.session.user);
    let newNoteBookButton;
    if (userState) {
        newNoteBookButton = <NavLink style={{ textDecoration: 'none' }} to='/note/new' >

            <button className='btn-1'>
                <img className='note-icon' alt='svgImg' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik03OC44MzMzMywxNC4zMzMzM3Y2NC41aC02NC41djE0LjMzMzMzaDY0LjV2NjQuNWgxNC4zMzMzM3YtNjQuNWg2NC41di0xNC4zMzMzM2gtNjQuNXYtNjQuNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==' />

                <div>New Note</div>
            </button >
        </NavLink >


    }
    return (
        <>
            {newNoteBookButton}
        </>

    )
}
export default NewNoteBookButton