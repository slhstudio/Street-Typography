import React, { PureComponent } from 'react';
import { isSignedIn } from '../utilities/api'
import PropTypes from 'prop-types';

class LogIn extends PureComponent {
  static propTypes = {
    isUser: PropTypes.bool.isRequired,
    handleLogIn: PropTypes.func.isRequired
  }
  
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

