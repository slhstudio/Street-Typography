import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
import { isSignedIn } from '../utilities/api';
import PhotoGrid from './PhotoGrid';

class Home extends Component {
  state = {
    loading : true,
    photos : [],
    notes : [],
    page : 0
  }

  componentDidMount = async () => {
    //call api
    const photos = await this.findAllPhotos();
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

    //if parent does not indicate user is authorized...(i.e if route is entered directly, this prop will not be set)
    if (!this.props.isUser) {
    //checks to see if user is logged in and returns username if user exists...
      const user = await isSignedIn();
      if (user) {
        this.props.handleLogIn(user);
      }
    }
  }

  //factor into api file
  findAllPhotos = async (error) => {
    const result = await axios.get('/findAllPhotos')
      .catch(error);
    return result;
  }

  render () {
    const { loading, photos, notes } = this.state;

    return (
      <div>
        { loading
          ? <Loading/>
          : <PhotoGrid 
              photos={photos}
              notes={notes}
            />
        }
      </div>
    )
  }
}

export default Home