import React from 'react';
import PropTypes from 'prop-types';


const Input = (props) => {
    return (
      <div>
        <input
          id={props.name}
          type={props.type}
          name={props.name}
          accept={props.accept}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
    )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired
}



export default Input;














