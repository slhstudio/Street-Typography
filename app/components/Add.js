import React, { Component } from 'react';


class Add extends Component {
  state = {
    photo : null,
    notes: '',
    location: {
      address: '',
      longitude: '',
      latitude:'',
    }
  }

  componentDidMount = () => {
    const dropdown = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    dropdown.addListener('place_changed', () => {;
      const place = dropdown.getPlace();
      console.log(place);
     
      if (place) {
        this.setState( prevState => {
          return { 
            location : {...prevState.location, address: place.formatted_address}
          }
        })   
      }
    })
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
        this.setState(() => ({
           photo: file
        }));
        break;
      case 'location[address]':
        this.setState( prevState => ({location : {...prevState.location, address: value}}));
        break;   
      default:
        this.setState(() => ({ [name]: value }));
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
         <input 
          id='autocomplete'
          type='text'
          name='location[address]'
          placeholder='Address (or closest guess)'
          value={this.state.location.address}
          onChange={this.onChange}
          required
        />
        {/* // <input 
        //   type='text'
        //   name='location[coordinates][0]'
        //   placeholder='Longitude'
        //   value={this.state.location.longitude}
        //   onChange={this.onGeoChange}
        //   required
        // />
        // <input 
        //   type='text'
        //   name='location[coordinates][1]'
        //   placeholder='Latitude'
        //   value={this.state.location.latitude}
        //   onChange={this.onGeoChange}
        //    required
        // /> */} 

        <button type='submit'>
          UPLOAD
        </button>
      </form>
    )
  }
}

export default Add;


