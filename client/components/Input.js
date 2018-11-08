import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

const StyledInput = styled.input`
  font-size: inherit;
  border: .2rem solid black;
  padding: 2rem;
  ${props => props.purpose ==='addForm' && css`
    margin: 1em 20% 1em 20%;
    background: none;
    border: none;
    border-bottom: .1rem solid black;
    padding: 2em 2em 1em .5em;
    ::placeholder {
      color: #393939;
    }
    &:focus {
      outline: 0;
      border-bottom: .1rem solid white;
      ::placeholder {
        color: white;
      }
    }
  `}
  ${props => props.purpose ==='editForm' && css`
    margin: 1em 1em 1em 0;
  `}
`;

const Input = (props) => {
  return (
    <StyledInput
      id={props.name}
      type={props.type}
      name={props.name}
      accept={props.accept}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      purpose={props.purpose}
      required={props.required}
    />
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  purpose: PropTypes.string,

}

export default Input;














