import React, { Component } from 'react';

class Add extends Component {
  state = {
    selectedFile : null
  }

  // handleChange = (event) => {
  //   this.setState(() => {photo: event.target.value})
  // }

  fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    this.setState({
      selectedFile : file
    })
  }
  
  fileUploadHandler = (event) => {
      event.preventDefault();
      const data = new FormData();
      data.append = ('image', this.state.selectedFile, this.state.selectedFile.name);
      console.log(data);
      // const pic = this.state.selectedFile;
      // console.log(pic);
      fetch('/addPhoto', {
        method: 'post',
        body: data
      }).then(response => {
        console.log(response);
      });
    }
      // (async () => {
      //   const rawResponse = await fetch('https://httpbin.org/post', {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({a: 1, b: 'Textual content'})
      //   });
      //   const content = await rawResponse.json();
      
      //   console.log(content);
      // })();
  

   //EXAMPLE:
  //  export async function battle (players) {
  //   const results = await Promise.all(players.map(getUserData))
  //     .catch(handleError);
  
  //   return results === null
  //     ? results
  //     : sortPlayers(results);
  // }
  
  
  // export async function fetchPopularRepos (language) {
  //   const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
  
  
  //   const response = await fetch(encodedURI)
  //     .catch(handleError);
  
  //   const repos = await response.json();
  
  //   return repos.items;
  
  // }
  
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


