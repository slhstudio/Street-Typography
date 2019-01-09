import React, { Component } from 'react';
import Loading from './Loading';
import Input from './Input';
import { findPlaces } from '../utilities/api';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import mapStyles from '../../client/mapStyles';

const StyledMain = styled.div.attrs({
  className: 'location'
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledMap = styled.div.attrs({
  id: 'map'
})`
  height: 500px;
`;

class Locator extends Component {
  state = {
    location: {
      address: '',
      lat: 34.15,
      lng: -118.36
    }
  };

  componentDidMount = () => {
    const mapDiv = document.getElementById('map');
    const { lat, lng } = this.state.location;
    const map = new google.maps.Map(mapDiv, {
      center: { lat, lng },
      zoom: 10,
      styles: mapStyles
    });
    this.getPlaces(map, lat, lng);
    const geoInput = document.getElementById('geolocate');
    const dropdown = new google.maps.places.Autocomplete(geoInput);

    //this fires when a place is selected in dropdown
    dropdown.addListener('place_changed', () => {
      const place = dropdown.getPlace();
      console.log(place);
      if (place) {
        this.setState(prevState => {
          return {
            location: {
              ...prevState.location,
              address: place.formatted_address,
              lng: place.geometry.location.lng(),
              lat: place.geometry.location.lat()
            }
          };
        });
        const { lat, lng } = this.state.location;
        this.getPlaces(map, lat, lng);
      }
    });
  };

  getPlaces = async (map, lat, lng) => {
    const places = await findPlaces(map, lat, lng);
    if (!places.length) {
      alert('no street type nearby!');
    }
    const bounds = new google.maps.LatLngBounds();
    const infoWindow = new google.maps.InfoWindow();

    const markers = places.map(place => {
      const [placeLng, placeLat] = place.location.coordinates;
      const position = { lat: placeLat, lng: placeLng };
      bounds.extend(position);
      const marker = new google.maps.Marker({
        map,
        position,
        //'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        ColorType: '#21B1BB'
      });
      marker.place = place;
      return marker;
    });

    markers.forEach(marker =>
      marker.addListener('click', function() {
        console.log(this.place);
        const html = `
          <div style='width:300px'>
            <a href='/photo/${this.place.photo}'>
              <img style='width:100%' src='/uploads/${this.place.photo}' 
                   alt='${this.place.notes}'/>
              <p>${this.place.notes}</p>
              <p>${this.place.location.address}</p>
            </a>
          </div>
        `;
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
      })
    );
    //then zoom the map to fit all the markers perfectly
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState(prevState => ({
      location: { ...prevState.location, address: value }
    }));
  };

  render() {
    return (
      <StyledMain>
        <Input
          type='text'
          name='geolocate'
          value={this.state.location.address}
          placeholder='enter a location'
          onChange={this.handleChange}
          purpose={'searchForm'}
        />
        <StyledMap id='map' />
      </StyledMain>
    );
  }
}

export default Locator;
