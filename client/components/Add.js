import React, { Component } from 'react';
import Input from './Input';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { isSignedIn, submitPhotos } from '../utilities/api';
import PropTypes from 'prop-types';

class Add extends Component {
  static propTypes = {
    isUser: PropTypes.bool.isRequired,
    handleLogIn: PropTypes.func.isRequired
  }
  
  state = {
    photo : null,
    photoName:'',
    notes: '',
    location: {
      address: '',
      longitude: '',
      latitude:'',
    }
  }

  componentDidMount = async () => {
    if (!this.props.isUser) {
    //checks to see if user is logged in and returns username if user exists...
      const user = await isSignedIn();
      if (user) {
        this.props.handleLogIn(user);
      }
    } 
    
    if (this.props.isUser) {
        const addressInput = document.getElementById('address');
        const dropdown = new google.maps.places.Autocomplete(addressInput);

        //this fires when a place is selected in dropdown
        dropdown.addListener('place_changed', () => {
          const place = dropdown.getPlace();
        
          if (place) {
            this.setState( prevState => {
              return { 
                location : {
                  ...prevState.location, 
                  address: place.formatted_address, 
                  longitude: place.geometry.location.lng(),
                  latitude: place.geometry.location.lat()
                }
              }
            })   
          }
        });
        //prevents the form from being submitted if someone hits enter on the dropdown
        addressInput.addEventListener('keydown', (e) => {
          if (e.keyCode === 13) e.preventDefault();
        })
    }
  }

  onChange = (event) => {
    let file;
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0]
    }
    const name = event.target.name;
    const value = event.target.value;
    
    switch (name) {
      case 'image':
        this.setState(() => ({ photo: file }));
        break;
      case 'address' || 'longitude' || 'latitude':
        this.setState(prevState => ({ location : {...prevState.location, [name]: value }}));
        break;   
      default:
        this.setState(() => ({ [name]: value }));
    }
  }

  handleSubmit = async(e, error) => {
    e.preventDefault();

    const { photo, notes } = this.state;
    const { address, longitude, latitude } = this.state.location;

    let formData = new FormData();
    
    formData.append('image', photo);
    formData.append('notes', notes);
    formData.append('location[address]', address);
    formData.append('location[coordinates][0]', longitude);
    formData.append('location[coordinates][1]', latitude);

    const result = await submitPhotos(formData)
      .catch(error);
      
    this.setState(() => ({ photoName: result }));
  }
   
  render () {
    const { photoName } = this.state;
    if (photoName) {
      return <Redirect to= {`photo/${photoName}`} />
    }
    return (
      <div>
        { !this.props.isUser
          ? <p>If you would like to add photos, please log in.</p>
          : <form onSubmit={this.handleSubmit}>
              <Input 
                type={'file'}
                name={'image'}
                accept={'image/gif, image/png, image/jpeg'}
                handleChange={this.onChange}
                required
              />
              <Input
                type={'text'}
                name={'notes'}
                placeholder={'Add some notes here'}
                value={this.state.notes}
                handleChange={this.onChange}
              />
              <Input 
                type={'text'}
                name={'address'}
                placeholder={'Address (or closest guess)'}
                value={this.state.location.address}
                handleChange={this.onChange}
                required
              />
              <Input 
                type={'hidden'}
                name={'longitude'}
                placeholder={'Longitude'}
                value={this.state.location.longitude}
                handleChange={this.onChange}
                required
              />
              <Input 
                type={'hidden'}
                name={'latitude'}
                placeholder={'Latitude'}
                value={this.state.location.latitude}
                handleChange={this.onChange}
                required
              /> 
              <button type='submit'>
                UPLOAD
              </button>
            </form>
        }
        </div>
    )
  }
}

export default Add;


