import React from 'react';


const Input = (props) => {
    return (
      <div>
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.handleChange}
        />
      </div>
    )
}



export default Input;














