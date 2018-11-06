import React, { PureComponent } from 'react';
import { isSignedIn } from '../utilities/api'
import PropTypes from 'prop-types';
import Button from './Button';
import styled from 'styled-components';
//import Icon from '../assets/google_icon.svg'; 


const StyledLogInBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

class LogIn extends PureComponent {
  static propTypes = {
    isUser: PropTypes.bool.isRequired,
    handleLogIn: PropTypes.func.isRequired
  }
  
  componentDidMount = async () => {
    if (!this.props.isUser) {
      //checks to see if user is logged in and returns username if user exists...
      const user = await isSignedIn();
        if (user) {
          this.props.handleLogIn(user);
        }
    }
  }
  
  render () {
    return (
      <StyledLogInBox>
        <p> Log in or Sign in with</p>//
        <a href='/auth/google'>
         
          <Button text='Google'/>
        </a>
      </StyledLogInBox>
    )
  }
}


export default LogIn;

