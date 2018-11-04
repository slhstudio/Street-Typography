import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'; 

const StyledForm = styled.form.attrs({
  className: 'form'
})` 
  display: flex;
  flex-direction: column;
  margin: 5%;
`;

class AddForm extends Component {        
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  doSubmit = (e) => {
    this.props.onSubmit(e);
  }

  render () {
    return (
      <StyledForm onSubmit={this.doSubmit}>   
        {this.props.children}
      </StyledForm> 
    )
  }
}
             

export default AddForm;