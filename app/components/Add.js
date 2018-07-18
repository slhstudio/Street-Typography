import React, { Component } from 'react';

class Add extends Component {
  state = {
    justSubmitted: false
  }

  // handleChange = (event) => {
  //   this.setState(() => {photo: event.target.value})
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(() => {justSubmitted: true});
  
    
    // console.log(event.target.value);
   // this.setState(() => ({justSubmitted: true}))
     

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
  }

  render () {
    return (
      <div>
        <form action='/add' method='POST' onSubmit={this.handleSubmit}  encType='multipart/form-data'>
          <label htmlFor='photo'>Add a photo!</label>
          <input 
            id='photo' 
            name='photo'
            accept='image/gif, image/png, image/jpeg'
            placeholder='upload here' 
            type='file' 
            autoComplete='off' 
           // onChange = {this.handleChange}
          />
          <button type='submit'>
            UPLOAD
          </button>
        </form>
      </div>
    )
  }
}

export default Add;


