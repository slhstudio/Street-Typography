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
              <p>{props.logged}</p>
            </NavLink>
          : <div className='row greeting'>
              <p>Hi, {props.name}!</p>
              <a href='/auth/logout'>
               <p>{props.logged}</p>
              </a>
            </div>
            
          }
        </li>
      </ul>
    )
  }


export default Nav