import React, { Component } from 'react';
//import autocomplete from '../utilities/autocomplete';
//import axios from 'axios';
//import { setTimeout } from 'timers';

class Place extends Component {
  state = {
    address:'',
    longitude:'',
    latitude:''
  }

  componentDidMount () {
    this.handleAddress();
  }

  handleAddress () {
    const dropdown = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    dropdown.addListener('place_changed', this.handleGetPlace(dropdown));
  }
    
  handleGetPlace (dropdown) {
    
      const place = dropdown.getPlace();
      console.log(place);
      const address = place.formatted_address;

      if (address) {
        this.setState(() => ({
          address : address
        }))
      }
  }

  render () {
    return (
      <div>
        <input
        id='autocomplete'
        type='text'
        name='location[address]'
        placeholder=''
        hintText='Enter Address'
        value={this.state.address}
        
        />
      </div>
    )
  }
}

class Add extends Component {
  state = {
    selectedFile : '',
    notes: '',
    // location: {
    //   address: '',
    //   longitude: '',
    //   latitude:'',
    // }
  }

  onChange = (event) => {
    switch (event.target.name) {
      case 'image':
        this.setState({ selectedFile: event.target.files[0] });
        break;
      default:
        this.setState({ [event.target.name]: event.target.value });
    }
  }

  // onGeoChange = (event) => {
  //   let value = event.target.value;
  //   let name = event.target.name;
  //   let direction = '', nested = '';
  //   let property = name.split('[')[1].split(']')[0];
  //   if (property !== 'address') {
  //     direction = name.charAt(name.length - 2);
  //     direction === '0' ? direction = 'longitude' : direction = 'latitude';
  //   }
  //   direction ? nested = direction : nested = property;
  //   this.setState( prevState => {
  //     return { 
  //        location : {...prevState.location, [nested]: value}
  //     }
  //  })
    // this.setState({
    //   location: Object.assign({}, this.state.location, {[nested]: value})
    // });
  //   setTimeout (() => {
  //     const { address, latitude, longitude } = this.state.location;
  //     autocomplete(address, latitude, longitude);
  //   }, 50);
  // }
  
  // onSubmit = async (event, error) => {
  //   event.preventDefault();
  //   let formData = new FormData();
  //   formData.append = ('image', this.state.selectedFile);
  //   console.log(formData);

  //   const done = await axios.post('/addPhoto', formData)
  //     .catch(error);
    
      // headers: {
      //  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      // }
    // ).then((response) => {
    //     console.log('res', response.data);
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // }
   
  render () {
  
    return (
      <form action='/addPhoto' method='POST' encType='multipart/form-data'>
      {/* <form onSubmit={this.onSubmit}>  */}
        <input 
          type='file'
          name='image'
          accept='image/gif, image/png, image/jpeg'
          onChange={this.onChange}
          required
        />
        <input
          name='notes'
          placeholder='Add some notes'
          value={this.state.notes}
          onChange={this.onChange}
        />
        <Place/>
        {/* <input 
          type='text'
          name='location[address]'
          placeholder='Address (or closest guess)'
          value={this.state.location.address}
          onChange={this.onGeoChange}
          required
        />
        <input 
          type='text'
          name='location[coordinates][0]'
          placeholder='Longitude'
          value={this.state.location.longitude}
          onChange={this.onGeoChange}
          required
        />
        <input 
          type='text'
          name='location[coordinates][1]'
          placeholder='Latitude'
          value={this.state.location.latitude}
          onChange={this.onGeoChange}
           required
        /> */}

        <button type='submit'>
          UPLOAD
        </button>
      </form>
    )
  }
}

export default Add;


