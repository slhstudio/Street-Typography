import React, { Component } from 'react';
import Input from './Input';

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
    const addressInput = document.getElementById('autocomplete');
    const dropdown = new google.maps.places.Autocomplete(addressInput);

    //this fires when place is selected in dropdown
    dropdown.addListener('place_changed', () => {;
      const place = dropdown.getPlace();
      console.log(place);
     
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

  onChange = (event) => {
    let file, direction, nested, property;
    // gets file input
    if (event.target.files && event.target.files[0]) {
      file = event.target.files[0]
    }
    const name = event.target.name;
    const value = event.target.value;
    
    //get property out of brackets in name (N.B. need input names in this format for MongoDB geo features)
    if (name.charAt(8) === '[') {
      property = name.split('[')[1].split(']')[0];
      if (property !== 'address') {
        direction = name.charAt(name.length - 2);
        direction === '0' ? direction = 'longitude' : direction = 'latitude';
      }
    }
    //sets nested equal to direction if either lat or lng exists or sets it to address
    direction ? nested = direction : nested = property;
  
    switch (name) {
      case 'image':
        this.setState(() => ({
           photo: file
        }));
        break;
      case `location[${nested}]`:
        this.setState(prevState => ({location : {...prevState.location, [nested]: value}}));
        break;   
      default:
        this.setState(() => ({ [name]: value }));
    }
  }

  handleInput = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    this.setState(() => ({ [name]: value }));
  }
   
  render () {
  
    return (
      <form action='/addPhoto' method='POST' encType='multipart/form-data'>
    
        <input 
          type='file'
          name='image'
          accept='image/gif, image/png, image/jpeg'
          onChange={this.onChange}
          required
        />
       <Input
          id={'notes'}
          type={'text'}
          name={'notes'}
          placeholder={'Add some notes here'}
          value={this.state.notes}
          handleChange={this.handleInput}
       />
        <Input 
          id={'autocomplete'}
          type={'text'}
          name={'location[address]'}
          placeholder={'Address (or closest guess)'}
          value={this.state.location.address}
          handleChange={this.onChange}
          required
        />
        <Input 
          id={'longitude'}
          type={'hidden'}
          name={'location[coordinates][0]'}
          placeholder={'Longitude'}
          value={this.state.location.longitude}
          handleChange={this.onChange}
          required
        />
        <Input 
          id={'latitude'}
          type={'hidden'}
          name={'location[coordinates][1]'}
          placeholder={'Latitude'}
          value={this.state.location.latitude}
          handleChange={this.onChange}
          required
        /> 
        <button type='submit'>
          UPLOAD
        </button>
      </form>
    )
  }
}

export default Add;


