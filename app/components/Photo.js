import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class Photo extends Component {
  state = {
    loading : true,
    image: '',
    notes: ''
  }

  componentDidMount = async () =>  {
    //get photo name from url
    const photo = this.props.match.params.photo;
    //call to api function
    const pic = await this.findPhoto(photo);
    this.setState(() => ({
      loading: false,
      image: pic.photo,
      notes: pic.notes
    }))
  }

  findPhoto = async (photo, error) => {
    const result = await axios.get(`/findphoto/${photo}`)
      .catch(error);
    return result.data;
  }

  render () {
    const { loading, image, notes } = this.state;

    if (loading) {
      return (
        <Loading/>
      )
    }
    return (
      <div>  
        <img src={`/uploads/${image}`}/>
        <div>
          <p>{notes}</p>
        </div>
      </div>
    )
  }
}

export default Photo