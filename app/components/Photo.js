import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Edit from './Edit';

class Photo extends Component {
  state = {
    user: true,
    loading: true,
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
    const { user, loading, image, notes } = this.state;

    if (loading) {
      return (
        <Loading/>
      )
    }
    return (
      <div className='photoSoloBox'>  
        <img className= 'photoSolo' src={`/uploads/${image}`}/>
        <Edit info={notes}/>
      </div>
    )
  }
}

export default Photo