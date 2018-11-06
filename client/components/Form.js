import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'; 

const StyledForm = styled.form` 
  display: flex;
  flex-direction: column;
  margin: 5%;
`;

const Form = (props) => {     
  return (
    <StyledForm onSubmit={props.onSubmit}>  
      {props.children}
    </StyledForm> 
  )
}
   
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Form;