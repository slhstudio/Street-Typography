import React, { PureComponent } from 'react';
import { isSignedIn } from '../utilities/api'


class LogIn extends PureComponent {
  componentDidMount = async () => {
    if (!this.props.isUser) {
      //checks to see if user is logged in and returns username if user exists...
      const user = await isSignedIn();
        if (user) {
          this.props.handleLogIn(user);
        }
    }
  }
  
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

