

import Navigation from '../Navigation'
import './Sidebar.css'

const Sidebar = ({ isLoaded }) => {

    return (
        <div className='container'>
            <Navigation isLoaded={isLoaded} />
        </div>

    )
}

export default Sidebar