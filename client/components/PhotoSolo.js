import React from 'react';
import Edit from './Edit';
import PropTypes from 'prop-types';

const PhotoSolo = (props) => {
  return (
    <div className='photoSoloBox'>  
      <img className= 'photoSolo' src={`/uploads/${props.photo}`}/>
      <img className= 'map' src={props.map}/>
        { props.name === props.author
          ? <div>
              <Edit 
                info={props.notes}
                photo={props.photo}
              />
            </div>
          : <p>{props.notes}</p>
        }
    </div>
  )
}

PhotoSolo.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string,
  map: PropTypes.string.isRequired,
  notes: PropTypes.string,
  photo: PropTypes.string.isRequired
}

export default PhotoSolo;


