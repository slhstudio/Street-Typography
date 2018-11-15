import React, {
  Component
} from 'react';
import Loading from './Loading';
import {
  findAllPhotos,
  isSignedIn
} from '../utilities/api';
import PhotoGrid from './PhotoGrid';
import PropTypes from 'prop-types';

class Home extends Component {
  static propTypes = {
    isUser: PropTypes.bool.isRequired,
    handleLogIn: PropTypes.func.isRequired
  }

  state = {
    loading: true,
    photos: [],
    notes: [],
    page: 0
  }

  componentDidMount = async () => {
    const photos = await findAllPhotos();
    const notesArray = [],
      photoArray = [];
    photos.data.forEach(item => {
      photoArray.push(item.photo);
      notesArray.push(item.notes);
    });

    this.setState(() => ({
      loading: false,
      photos: this.state.photos.concat(photoArray),
      notes: this.state.notes.concat(notesArray)
    }))

    // if parent does not indicate user is authorized...(i.e if route is entered directly, this prop will not be set)
    if (!this.props.isUser) {
      //checks to see if user is logged in and returns username if user exists...
      const user = await isSignedIn();
      if (user) {
        this.props.handleLogIn(user);
      }
    }
  }

  render() {
    const {
      loading,
      photos,
      notes
    } = this.state;

    return ( <
      div > {
        loading ?
        < Loading / >
        :
          < PhotoGrid
        photos = {
          photos
        }
        notes = {
          notes
        }
        />
      } <
      /div>
    )
  }
}

export default Home