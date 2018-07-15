import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          All Photos
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName='active' to='/add'>
          Add Photos
        </NavLink>
      </li>

      <li>
        <NavLink activeClassName='active' to='/mine'>
          My Photos
        </NavLink>
      </li>
    </ul>
  )
}

export default Nav