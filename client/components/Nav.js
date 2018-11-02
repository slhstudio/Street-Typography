import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavList = styled.ul`
  display: flex;
  .active {
    font-weight: bold;
  }
  li {
    margin-right: 1em;
    margin-left: 1em;
  }
  li:last-child {
    margin-left: auto
  }
  .greeting {
    color: darkcyan;
    display: flex;
    flex-direction: row;
  }
  /*nest this one with sass*/
  .nav li:last-child a{
    color:white;
    margin-left: 2em;
  }
`;

const Nav = (props) => {
    return (
      <NavList>
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
          : <div className='greeting'>
              Hi, {props.name}!
              <a href='/auth/logout'>
                {props.logged}
              </a>
            </div>
          }
        </li>
      </NavList>
    )
  }

  Nav.propTypes = {
    logged: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isUser: PropTypes.bool.isRequired,
  }

export default Nav