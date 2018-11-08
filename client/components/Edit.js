import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { uploadChanges, deletePhoto } from '../utilities/api';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './Button';
import styled, { css } from 'styled-components';

const StyledRow = styled.div.attrs({
  className: 'row'
})`
  display: flex;
  flex-direction: row;
  p {
    margin: 2em 2em 0 0;
  }
`;


class Edit extends Component {
  static propTypes = {
    info: PropTypes.string,
    photo: PropTypes.string.isRequired
  };

  state = {
    update : this.props.info,
    image: this.props.photo,
    editing: false,
    deleted: false
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState (() => ({ update : value }));
  }

  handleClick = () => {
    this.setState (() => ({ editing : true }));
  }

  saveChanges = async () => {
    const { update, image } = this.state;
    const change = await uploadChanges(update, image);
    this.setState(() => ({ editing : false }));
  }
  
  removePhoto = async (error) => {
    const { image } = this.state;
    const remove = await deletePhoto(image);
    this.setState(() => ({ deleted : true }));
  }
  
  render () {
    const { update, editing, deleted } = this.state;
    
    return (
      <div>
        { deleted
          ? <Redirect to='/mine'/>
          : <StyledRow> 
              {!editing 
                ? <StyledRow> 
                    <p>Notes: {update}</p>
                    <Button 
                      data-test='test1' 
                      onClick={this.handleClick}
                      text='EDIT'
                    />
                  </StyledRow>
                : <StyledRow>
                    <Input 
                      type='text'
                      name='notes' 
                      value={this.state.update} 
                      placeholder='Add some notes' 
                      onChange={this.handleChange} 
                      purpose={'editForm'}
                    />
                    <Button 
                      data-test='test2' 
                      onClick={this.saveChanges}
                      text='SAVE'
                    />
                  </StyledRow>
              }
              <div>
                <Button 
                  data-test='test3' 
                  onClick={this.removePhoto}
                  text='DELETE'
                /> 
              </div>
            </StyledRow>
        }
      </div>
    )
  }
}

export default Edit