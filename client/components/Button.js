import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';


const StyledButton = styled.button`
  display: flex;
  font-size: inherit;
  justify-content: center;
  padding: 2rem;
  margin: 1em .5em 1em .5em;
  border: .2rem solid black;
 
  ${props => props.text === 'UPLOAD' && css`
      background: salmon;
      margin: 1.5em 30% 1.5em 30%;
      border: none;
  `}

  ${props => props.text === 'Sign in with Google' && css`
      align-items: center;
      background: white;
      margin: 7em 1em 1em 1em;
      padding: 0 2em 0 1em;
      border: none;
      &:hover {
        border: .2rem solid #4285F4;
      }
  `}
`;

const Button = (props) => {
  return (
    <StyledButton 
      type={props.type}
      onClick={props.onClick}
      text={props.text}
    >
      {props.children}
      {props.text}
    </StyledButton>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
}

export default Button;
