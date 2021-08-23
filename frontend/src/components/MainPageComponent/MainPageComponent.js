
import { Link } from 'react-router-dom';
import './MainPage.css'
import MainPageNotes from '../MainPageNotes'
const MainPage = () => {
    let date = new Date();
    let message = date.toTimeString()[0] + date.toTimeString()[1] > 12 ? 'Afternoon' : 'Morning'

    return (
        <div
            className='main-page'
        >
            <div
                className='main-welcome-message'
            >
                <div>Good {message}</div>
                <div>{date.toDateString()}</div>
            </div>
            <div className='main-page-note-holder'>
                <div>
                    <Link className='main-page-note-link'>
                        NOTES <div className='note-bracket'>:</div>
                    </Link>
                </div>
                <MainPageNotes />
            </div>
        </div>
    )
}

export default MainPage