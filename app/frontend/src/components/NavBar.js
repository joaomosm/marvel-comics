import React from 'react';
import logo from './../assets/marvel_logo.png';

const NavBar = ({ onChange }) => (
  <div className='navbar'>
    <div>
      <img src={logo} alt='Logo' />
    </div>
    <div>
      <input
        type='text'
        placeholder='character name'
        className='navbar-search'
        onChange={onChange}
      />
    </div>
  </div>
);

export default NavBar;
