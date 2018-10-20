import React, { Component } from 'react';


class LogIn extends Component {
  
  render () {
    return (
      <div className='loginbox'>
        <p> Log in or Sign in with</p>
        <a href='/auth/google'><button>Google</button></a>
      </div>
    )
  }
}


export default LogIn;

