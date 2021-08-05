import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className='nav-button' to='/login'>Log In</NavLink>
        <NavLink className='nav-button' to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className='nav-bar'>
      {isLoaded && sessionLinks}
    </nav>

  );
}

export default Navigation;