import React, { Component } from 'react';
import ReactRouter from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Add from './Add';
import Photo from './Photo';
import Mine from './Mine';
import LogIn from './Login';


class App extends Component {
 state = {
   access: 'Log In',
   username:'',
   isAuthed: false
 }

 setLogIn = (user) => {
   this.setState(() => ({
     access: 'Log Out',
     isAuthed: true,
     username: user
   }))
 }

  render () {
    const { access, username } = this.state;
    return (
      <Router>
        <div className='container'>
          <Nav 
            logged={access} 
            name={username}
          />
            <Switch>
              <Route 
                exact path='/' 
                render={() => <Home  handleLogIn={this.setLogIn} />}
              />
              <Route path ='/add' component={Add}/>
              <Route path = '/mine' component={Mine} />
              <Route path='/photo/:photo' component={Photo} />
              <Route path='/logIn' component={LogIn} />
            
            </Switch>
        </div>
      </Router>
    )
  }
}

export default App
