import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Edit extends Component {
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
    const { update } = this.state;
    const change = await this.uploadChanges(update);
    this.setState(() => ({ editing : false }));
  }

  //factor out this api function
  uploadChanges = async(update, error) => {
    const { image } = this.state
    const newNotes = await axios.post(`/uploadChange/${image}`, { 'notes' : update })
      .catch(error);
    return newNotes.data;
  }

  removePhoto = async (error) => {
    const { image } = this.state;
    const remove = await this.deletePhoto(image);
    this.setState(() => ({ deleted : true }));
  }

  //factor out this api function
  deletePhoto = async (image, error) => {
    const trash = await axios.delete(`/delete/${image}`)
      .catch(error);
    return trash.data;
  }

  render () {
    const { update, editing, deleted } = this.state;
    
    return (
      <div>
        { deleted
          ? <Redirect to='/mine'/>
          : <div className='row'> 
              {!editing 
                ? <div> 
                    <p>{update}</p>
                    <button onClick={this.handleClick}>
                      EDIT
                    </button>
                  </div>
                : <div >
                    <input type='text' value={this.state.update} onChange={this.handleChange}/>
                    <button onClick={this.saveChanges}>
                      SAVE
                    </button>
                  </div>
              }
              <div>
                <button onClick={this.removePhoto}>
                  DELETE
                </button> 
              </div>
            </div>
        }
      </div>
    )
  }
}

export default Edit