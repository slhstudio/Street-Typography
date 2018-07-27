import React, { Component } from 'react';
import axios from 'axios';


class Edit extends Component {
  state = {
    update : this.props.info,
    editing: false
  }

  handleChange = (event) => {
    this.setState ({update : event.target.value });
  }

  handleClick = () => {
    this.setState (() => ({ editing : true }));
  }

  saveChanges = () => {
    const { update } = this.state;
    //start here
    //make this async
    //write uploadChanges api function to post to db
    //on success, add :)
  }

  render () {
    const { info } = this.props;
    const { editing } = this.state;

    return (
      //notes field
      //edit button
      <div className='row'> 
        {!editing 
        ? <div> 
            {info}
            <button 
            onClick={this.handleClick}>
              EDIT
            </button>
          </div>
        : <div >
            <input type='text' value={this.state.update} onChange={this.handleChange}/>
            <button
            onClick={() => this.saveChanges}>
              SAVE
            </button>
          </div>}
      </div>
    )
  }
}

export default Edit