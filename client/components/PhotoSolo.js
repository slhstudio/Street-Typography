import React from 'react';
import Edit from './Edit';

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

export default PhotoSolo;


