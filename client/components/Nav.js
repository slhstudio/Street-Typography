import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
          : <div className='row greeting'>
              Hi, {props.name}!
              <a href='/auth/logout'>
                {props.logged}
              </a>
            </div>
          }
        </li>
      </ul>
    )
  }

  Nav.propTypes = {
    logged: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isUser: PropTypes.bool.isRequired,
  }

export default Nav