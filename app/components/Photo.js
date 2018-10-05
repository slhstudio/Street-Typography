import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
import Edit from './Edit';


class Photo extends Component {
  state = {
    user: false,
    loading: true,
    image: '',
    notes: ''
  }

  componentDidMount = async () =>  {
    //temporary simulation of whether user is logged in. Obviously highly insecure.
    const loggedIn = this.props.location.pathname.split('/');
    const user = loggedIn[loggedIn.length - 1];
    const photo = this.props.match.params.photo;
    const pic = await this.findPhoto(photo);
    this.setState(() => ({
      user: user,
      loading: false,
      image: pic.photo,
      notes: pic.notes,
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
    const { user, loading, image, notes, lat, lng } = this.state;

    if (loading) {
      return (
        <Loading/>
      )
    }
    return (
      <div className='photoSoloBox'>  
        <img className= 'photoSolo' src={`/uploads/${image}`}/>
        <img className= 'map' src={this.staticMap([lng, lat])}/>
        { user === 'true'
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