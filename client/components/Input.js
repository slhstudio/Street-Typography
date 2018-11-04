import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: .2em solid black;
  padding: 2em;
  margin: 1em 20% 1em 20%;
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
      onChange={props.handleChange}
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
  handleChange: PropTypes.func.isRequired
}



export default Input;














