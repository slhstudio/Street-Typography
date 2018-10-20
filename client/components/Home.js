import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
import { isSignedIn } from '../utilities/api'

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

    //checks to see if user is logged in and returns username if user exists...
    const user = await isSignedIn();
    if (user) {
      this.props.handleLogIn(user);
    }

    this.setState(() => ({
      loading : false,
      photos : this.state.photos.concat(photoArray),
      notes : this.state.notes.concat(notesArray)
    }))
  }

  
  //factor into api file
  findAllPhotos = async (error) => {
    const result = await axios.get('/findAllPhotos')
      .catch(error);
    return result;
  }

  render () {
    const { loading, photos, notes } = this.state;

    if (loading) {
      return (
        <Loading/>
      )
    }

    //refactor into photoGrid component?
    return (
      <ul className='photoGrid'>
        {photos.map((photo, index) => {
          return (
            <li key={index}>
              <a href={`/photo/${photo}/true`}>
                <img 
                  className='photoItem'
                  src={`/uploads/${photo}`}
                  alt={`street typography image: ${notes[index]}`}
                />
              </a>
            </li>
          )
        })}
      </ul>  
      
    )
  }
}

export default Home