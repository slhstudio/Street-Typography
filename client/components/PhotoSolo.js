import React from 'react';
import Edit from './Edit';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPhotoBox = styled.div`
  max-width: 800px;
  margin: 2rem auto;
`;

const StyledImg = styled.img`
  max-width: 100%;
  -webkit-box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.5);
`;

const PhotoSolo = (props) => {
  return (
    <StyledPhotoBox>  
      <StyledImg src={`/uploads/${props.photo}`}/>
      <StyledImg src={props.map}/>
        { props.name === props.author
          ? <div>
              <Edit 
                info={props.notes}
                photo={props.photo}
              />
            </div>
          : <p>{props.notes}</p>
        }
    </StyledPhotoBox>
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


