import React, { Component } from 'react';
import axios from 'axios';

class Add extends Component {
  state = {
    selectedFile : null,
    notes: ''
  };

  onChange = (event) => {
    switch (event.target.name) {
      case 'image':
        this.setState({ selectedFile: event.target.files[0] });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  }
  
  // onSubmit = (event) => {
  //   event.preventDefault();
  //   let data = new FormData();
  //   data.append = ('image', this.state.selectedFile);
  //   console.log(data);

  //   axios.post('/addPhoto', data
  //     // headers: {
  //     //  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  //     // }
  //   ).then((response) => {
  //       console.log('res', response.data);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //    }
   
  render () {
  
    return (
      <form action='/addPhoto' method='POST' encType='multipart/form-data'>
        <input 
          type='file'
          name='image'
          accept='image/gif, image/png, image/jpeg'
          onChange={this.onChange}
        />
        <textarea
          name='notes'
          placeholder='Add some notes'
          value={this.state.notes}
          onChange={this.onChange}
        />
        <button type='submit'>
          UPLOAD
        </button>
      </form>
    )
  }
}

export default Add;


