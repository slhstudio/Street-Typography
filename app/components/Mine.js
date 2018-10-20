import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
//import Photo from './Photo';
import { isSignedIn } from '../utilities/api'


class Mine extends Component {
  state = {
    user: true,
    loading : true,
    photos : [],
    notes : [],
    page : 0,
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
    const user = await isSignedIn();
    console.log(user);
  }

  //this api function will eventually become findMyPhotos once I build login feature
  findAllPhotos = async (error) => {
    const result = await axios.get('/findAllPhotos')
      .catch(error);
    return result;
  }

  render () {
    const { loading, photos, notes, photo } = this.state;

    if (loading) {
      return (
        <Loading/>
      )
    }

    //refactor into photoGrid component?
    return (
      <div>
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
      </div> 
    )
  }
}

export default Mine