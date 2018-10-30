import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { isSignedIn } from '../utilities/api';
import PhotoSolo from './PhotoSolo';
import PropTypes from 'prop-types';

class Photo extends Component {
  static propTypes = {
    isUser: PropTypes.bool.isRequired,
    handleLogIn: PropTypes.func.isRequired
  }

  state = {
    loading: true,
    image: '',
    notes: '',
    author:'',
    lat: null,
    lng: null
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
 
  staticMap = ([lng, lat]) => {
    //for testing purposes only: comment out
    //const MAP_KEY = 'xyz'
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x200&key=${MAP_KEY}&markers=${lat},${lng}&scale=2`;
  }

  findPhoto = async (photo, error) => {
    const result = await axios.get(`/findphoto/${photo}`)
      .catch(error);
    return result.data;
  }

  render () {
    const { loading, image, notes, author, lat, lng } = this.state;
    const { name } = this.props;

    return (
      <div>
        { loading
          ? <Loading/>
          : <PhotoSolo
              name={name}
              author={author}
              map={this.staticMap([lng, lat])}
              notes={notes}
              photo={image}
            />
        }
      </div>
    )
  }
}

export default Photo