import React, { PureComponent } from 'react';
import { isSignedIn } from '../utilities/api'
import PropTypes from 'prop-types';
import Button from './Button';
import styled from 'styled-components';
import Icon from '../assets/google_icon.png'; 


const StyledLogInBox = styled.div.attrs({
  className: 'log in box'
})`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.img`
  width: 3.5em;
  height: 3.5em;
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
        <a href='/auth/google'>
          <Button text='Sign in with Google'>
            <StyledLogo src={Icon}/>
          </Button>
        </a>
      </StyledLogInBox>
    )
  }
}


export default LogIn;

