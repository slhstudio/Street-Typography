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
   console.log('changing auth')
   this.setState(() => ({
     access: 'Log Out',
     isAuthed: true,
     username: user
   }));
 }

  render () {
    const { access, username, isAuthed } = this.state;
    return (
      <Router>
        <div className='container'>
          <Nav 
            logged={access} 
            name={username}
            isUser={isAuthed}
          />
            <Switch>
              <Route 
                exact path='/' 
                render={(props) => <Home {...props} isUser={isAuthed} handleLogIn={this.setLogIn} />}
              />
              <Route 
                path ='/add' 
                render={() => <Add isUser={isAuthed} handleLogIn={this.setLogIn}/>}
              />
              <Route 
                path = '/mine' 
                render={() => <Mine isUser={isAuthed} handleLogIn={this.setLogIn}/>}
              />
              <Route 
                path='/photo/:photo' 
                render={(props) => <Photo {...props} isUser={isAuthed} name={username} handleLogIn={this.setLogIn}/>}
              />
              <Route 
                path='/logIn' 
                render={() => <LogIn isUser={isAuthed} handleLogIn={this.setLogIn}/>}
              />
            </Switch>
        </div>
      </Router>
    )
  }
}

export default App
