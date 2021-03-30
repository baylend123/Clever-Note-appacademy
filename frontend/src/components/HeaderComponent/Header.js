import { useSelector } from 'react-redux'


import './Header.css'


const HeaderComponent = () => {
    const userState = useSelector(state => state.session.user);
    let welcomeMessage;
    if (userState) {
        welcomeMessage = `Welcome ${userState.username} . . .`
    }
    return (
        <h1 className="head">{welcomeMessage}</h1>
    )
}
export default HeaderComponent