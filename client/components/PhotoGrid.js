import React from 'react';
import { Link } from 'react-router-dom';


const PhotoGrid = (props) => {
  const { photos, notes } = props;

  return (
    <ul className='photoGrid'>
      {photos.map((photo, index) => {
        return (
          <li key={index}>
            <Link to={`/photo/${photo}`} >
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
  )
}

export default PhotoGrid;





