import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Edit from './Edit';
import { isSignedIn } from '../utilities/api'


class Photo extends Component {
  state = {
    loading: true,
    image: '',
    notes: ''
  }

  componentDidMount = async () =>  {
    if (!this.props.isUser) {
      //checks to see if user is logged in and returns username if user exists...
      const user = await isSignedIn();
        if (user) {
          this.props.handleLogIn(user);
      }
    }
    const photo = this.props.match.params.photo;
    const pic = await this.findPhoto(photo);

    this.setState(() => ({
      loading: false,
      image: pic.photo,
      notes: pic.notes,
      author: pic.author,
      lat: pic.location.coordinates[1],
      lng: pic.location.coordinates[0]
    }))
    
  }

  staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x200&key=${MAP_KEY}&markers=${lat},${lng}&scale=2`;

  findPhoto = async (photo, error) => {
    const result = await axios.get(`/findphoto/${photo}`)
      .catch(error);
    return result.data;
  }

  render () {
    const { loading, image, notes, author, lat, lng } = this.state;

    if (loading) {
      return (
        <Loading/>
      )
    }
    return (
      <div className='photoSoloBox'>  
        <img className= 'photoSolo' src={`/uploads/${image}`}/>
        <img className= 'map' src={this.staticMap([lng, lat])}/>
        { this.props.name === author
          ? <div>
              <Edit 
                info={notes}
                photo={image}
              />
            </div>
          : notes 
        }
      </div>
    )
  }
}

export default Photo