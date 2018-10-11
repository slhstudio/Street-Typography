import React from 'react';


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



export default Input;














