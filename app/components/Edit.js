import React, { Component } from 'react';
import axios from 'axios';


class Edit extends Component {
  state = {
    update : this.props.info,
    image: this.props.photo,
    editing: false
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState (() => ({update : value }));
  }

  handleClick = () => {
    this.setState (() => ({ editing : true }));
  }

  saveChanges = async () => {
    const { update } = this.state;
    const change = await this.uploadChanges(update);
    this.setState(() => ({ editing : false }));
    
    //on success, add :)
  }

  uploadChanges = async(update, error) => {
    const { image } = this.state
    const newNotes = await axios.post(`/uploadChange/${image}`, { 'notes' : update })
      .catch(error);
    return newNotes.data;
  }

  render () {
    const { update, editing } = this.state;
    
    return (
      //notes field
      //edit button
      <div className='row'> 
        {!editing 
        ? <div> 
            {update}
            <button 
            onClick={this.handleClick}>
              EDIT
            </button>
          </div>
        : <div >
            <input type='text' value={this.state.update} onChange={this.handleChange}/>
            <button
            onClick={this.saveChanges}>
              SAVE
            </button>
          </div>}
      </div>
    )
  }
}

export default Edit