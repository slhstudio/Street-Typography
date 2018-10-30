import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


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

PhotoGrid.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  notes: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default PhotoGrid;





