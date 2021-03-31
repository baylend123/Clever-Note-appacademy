
import Navigation from '../Navigation'
import HeaderComponent from '../HeaderComponent'
import NoteBooksComponent from '../NoteBooksComponent'
import NewNoteBookButton from '../NewNoteBookButton'
import './Sidebar.css'

const Sidebar = ({ isLoaded }) => {


    return (
        <div className='container'>
            <Navigation isLoaded={isLoaded} />
            <HeaderComponent />
            <NewNoteBookButton />
            <NoteBooksComponent />
        </div>

    )
}

export default Sidebar