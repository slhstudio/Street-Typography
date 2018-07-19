import React, { Component } from 'react';
import axios from 'axios';

class Add extends Component {
  state = {
    selectedFile : null
  }

  fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    this.setState({
      selectedFile : file
    })
  }
  //, this.state.selectedFile.name
  
  fileUploadHandler = (event) => {
      event.preventDefault();
      const data = new FormData();
      data.append = ('photo', this.state.selectedFile, this.state.selectedFile.name);
      console.log(data);
      // const pic = this.state.selectedFile;
      // console.log(pic);

      
  //let data = { Fred: 'Flintstone' };
    const boundary = '--- WebKit193844043-h'
    return axios.post('/addPhoto', data)
      // {headers: {
      //   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      //   'Content-Type': `multipart/form-data; boundary=${boundary}`,
      // }}
    
     .then(response => console.log(response));
    }
    // return fetch('/add', {
    //   method: 'POST',
    //   headers: { 'Content-Type' : 'multipart/form-data; boundary=--- WebKit193844043-h' },
    //   body: data
    // }).then(response => response.json()).then(data => console.log(data));
  
   
  
  //<!–– and the comment closes with ––>
  // <label htmlFor='photo'>Add a photo!</label>
  //<form action='/add' method='POST' encType='multipart/form-data'>
  render () {
   // if (this.state.selectedFile === null) {
    return (
      <div>
      
          <input 
            id='photo' 
            name='photo'
            accept='image/gif, image/png, image/jpeg'
            type='file' 
            onChange={this.fileSelectedHandler}
          />
          <button onClick={this.fileUploadHandler}>UPLOAD</button>
       
      </div>
    )
  // } else {
  //     return (
  //       <div>Success!</div>
  //     )
  //   }
  }
}

export default Add;


