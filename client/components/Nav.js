import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    return (
      <ul className='nav'>
        <li>
          <NavLink exact activeClassName='active' to='/'>
            Explore Photos
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
       
        <li>
          { !props.isUser
          ? <NavLink activeClassName='active' to='/logIn'>
              {props.logged}
            </NavLink>
          : 
              <li className='greeting'>
                Hi, {props.name}!
                <a href='/auth/logout'>
                  {props.logged}
                </a>
                </li>
            
          }
        </li>
      </ul>
    )
  }


export default Nav