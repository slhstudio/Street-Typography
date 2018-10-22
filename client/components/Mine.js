import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
//import Photo from './Photo';
import { isSignedIn } from '../utilities/api';
import { Link } from 'react-router-dom';


class Mine extends Component {
  state = {
    loading : false,
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
      this.setState(() => ({ loading: true }));
      //call api
      const photos = await this.findMine();
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
    const { loading, photos, notes, photo } = this.state;

    if (loading) {
      return (
        <Loading/>
      )
    }
    //refactor into photoGrid component?
    return (
      <div>
        { !this.props.isUser
          ? <p> You must be logged in to see your photos. </p>
          : !photos.length
          ? <p> You haven't added any photos yet. Get going!</p>
          : <ul className='photoGrid'>
              {photos.map((photo, index) => {
                return (
                  <li key={index}>
                    <Link to={`/photo/${photo}`}>
                      <img 
                        className='photoItem'
                        src={`/uploads/${photo}`}
                        alt={`street typography image: ${notes[index]}`}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul> 
        }
      </div> 
    )
  }
}

export default Mine