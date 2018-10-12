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

  render () {
    return (
      <Router>
        <div className='container'>
          <Nav />
            <Switch>
              <Route exact path='/' component={Home}/>
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
