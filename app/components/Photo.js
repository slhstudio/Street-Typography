import React, { Component } from 'react';
import axios from 'axios';

class Photo extends Component {
  state = {
    justSubmitted : true
  }

  componentDidMount = async () =>  {
    //get photo name from url
     const photo = this.props.match.params.photo;
     console.log('photo', photo)
    //call to  db
    const result = await this.findPhoto(photo);
    console.log('result', result)
  }

  findPhoto = async (photo, error) => {
    const data = await axios.get(`/findphoto/${photo}`)
      .catch(error);
    return data;
  }

  render () {
    
    return (
      <div> Success </div>
    )
  }
}

export default Photo