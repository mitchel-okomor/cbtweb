import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function Index() {
  return (
    <nav
      className={`navbar d-flex align-items-between  sticky-top navbar-dark bg-primary px-4 ${
        document.title.toLocaleLowerCase() === 'dashboard' && ' d-none'
      }`}
    >
      <a className='navbar-brand' href='/'>
        Logo
      </a>
      <ul className='  mr-4 mt-2 mt-lg-0 d-flex'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/register'>
            Signup
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/Login'>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Index;
