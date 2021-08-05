import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { logoutNotebook } from '../../store/notebook'
import { logoutNote } from '../../store/notes'
import './Navigation.css'

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(logoutNotebook())
    dispatch(logoutNote());
    history.push('/')
  };

  return (
    <>
      <div className='nav-user-info' onMouseOver={openMenu} >
        <div className='nav-user-icon'>{user.username[0]}</div><div className='nav-user-name'> {user.username}</div>

      </div>
      {showMenu && (
        <div className='drop'>
          <div onMouseLeave={closeMenu}>
            <div className='drop-item'>
              <button align='center' className='logout' onClick={logout}>Log Out</button>

            </div>
          </div>
        </div>

      )}
    </>
  );
}

export default ProfileButton;