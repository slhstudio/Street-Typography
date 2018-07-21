import React, { Component } from 'react';
import axios from 'axios';

class Add extends Component {
  state = {
    selectedFile : null
  };

  onChange = (event) => {
    const file = event.target.files[0];
    this.setState({
      selectedFile : file
    })
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append = ('image', this.state.selectedFile);
    console.log(data);

// let options = {
//     method: 'POST',
//     url: '/addPhoto',
//     headers: {
//       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//       'cache-control': 'max-age=0',
//       'upgrade-insecure-requests': '1'
//     },
//     data
// };

    axios.post('/addPhoto', data, {
      headers: {
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      }
    }).then((response) => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
     }
   
  render () {
  
    return (
        <form action='/addPhoto' method='POST' encType='multipart/form-data'>
          <input 
            type='file' 
            name='image'
            accept='image/gif, image/png, image/jpeg'
            onChange={this.onChange}
          />
          <button type='submit'>UPLOAD</button>
       </form>
      
    )
  }
}

export default Add;


