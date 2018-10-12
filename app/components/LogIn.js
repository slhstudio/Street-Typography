import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogIn extends Component {
  render () {
    return (
      <div className='loginbox'>
        <Link
          className='button'
          to={'/auth/google'}
        >
        Log in with Google
        </Link>
      </div>
    )
  }
}


export default LogIn;