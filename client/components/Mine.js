import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
//import Photo from './Photo';
import { isSignedIn, findMine } from '../utilities/api';
import PhotoGrid from './PhotoGrid';
import PropTypes from 'prop-types';


class Mine extends Component {
  static propTypes = {
    isUser: PropTypes.bool.isRequired,
    handleLogIn: PropTypes.func.isRequired
  }

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
      const photos = await findMine();
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

  render () {
    const { loading, photos, notes } = this.state;
    
    return (
      <div>
        {!this.props.isUser
         ? <p>You must be logged in to see your photos.</p>
         : loading
         ? <Loading/>
         : !photos.length
         ? <p>You haven't added any photos yet. Get Going!</p>
         : <PhotoGrid
              photos={photos}
              notes={notes}
           />
        }
      </div>
    )
  }
}

export default Mine