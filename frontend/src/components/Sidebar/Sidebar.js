import { useSelector } from 'react-redux'

import { ReactPainter } from 'react-painter';

import Navigation from '../Navigation'
import HeaderComponent from '../HeaderComponent'
import NoteBooksComponent from '../NoteBooksComponent'
import NewNoteBookButton from '../NewNoteBookButton'
import './Sidebar.css'



const Sidebar = ({ isLoaded }) => {
    const user = useSelector(state => state?.session?.user)
    let paint
    if (!user) {
        paint =
            <div>
                <h1>Draw Something</h1>
                <ReactPainter
                    width={500}
                    height={400}
                    initialColor={'red'}
                    onSave={blob => console.log(blob)}
                    render={({ triggerSave, canvas }) => (
                        <div >
                            <button hidden onClick={triggerSave}>Save Canvas</button>
                            <div>{canvas}</div>
                        </div>
                    )}
                />
            </div>
    }
    return (
        <div className='one container'>
            <Navigation isLoaded={isLoaded} />
            <HeaderComponent />
            <NewNoteBookButton />
            <NoteBooksComponent />


            {paint}

        </div>

    )
}

export default Sidebar