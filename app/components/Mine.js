import React, { Component} from 'react';
import axios from 'axios';
import Loading from './Loading';

class Mine extends Component {
  state = {
    user: true,
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
  }

  findAllPhotos = async (error) => {
    const result = await axios.get('/findAllPhotos')
      .catch(error);
    console.log('result', result);
    return result;
  }

  render () {
    const { loading, photos, notes } = this.state;

    if (loading) {
      return (
        <Loading/>
      )
    }

    return (
      <ul className='photoGrid'>
        {photos.map((photo, index) => {
          return (
            <li key={index}>
              <a href={`/photo/${photo}`}>
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

export default Mine