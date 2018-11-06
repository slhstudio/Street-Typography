import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';


const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  font-size: inherit;
  justify-content: center;
  padding: 2rem;
  margin: 1em .5em 1em .5em;
  border: .2rem solid black;
 
  ${props => props.children === 'UPLOAD' && css`
      background: salmon;
      margin: 1.5em 30% 1.5em 30%;
      border: none;
      border-radius: .5em;
  `}
`;

const Button = (props) => {
  return (
    <StyledButton 
      type={props.type}
      onClick={props.onClick}
      isAddForm={props.isAddForm}
    >
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