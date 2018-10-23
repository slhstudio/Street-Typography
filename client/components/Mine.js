import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
//import Photo from './Photo';
import { isSignedIn } from '../utilities/api';
import PhotoGrid from './PhotoGrid';


class Mine extends Component {
  state = {
    loading : true,
    photos : [],
    notes : [],
    page : 0,
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
      //call api
      const photos = await this.findMine();
      console.log('photos', photos);
      const notesArray = [], photoArray = [];
        photos.data.forEach(item => {
          photoArray.push(item.photo);
          notesArray.push(item.notes);
        });

      this.setState(() => ({
        loading : false,
        photos : this.state.photos.concat(photoArray),
        notes : this.state.notes.concat(notesArray)
      })) 
    }
  }

  findMine = async (error) => {
    const result = await axios.get('/findMine')
      .catch(error);
    return result;
  }

  render () {
    const { loading, photos, notes } = this.state;

    if (!this.props.isUser) {
      return (
        <div>
          <p> You must be logged in to see your photos. </p>
        </div>
      )
    } else if (loading && this.props.isUser) {
      return (
        <Loading/>
      )
    } else if (this.props.isUser && !photos.length) {
      return (
        <div>
          <p> You haven't added any photos yet. Get going!</p>
        </div>
      )
    } else {
        return (
          <PhotoGrid 
              photos={photos}
              notes={notes}
          />
        )
    }
  }
}

export default Mine