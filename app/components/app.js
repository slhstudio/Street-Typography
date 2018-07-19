import React, { Component } from 'react';
import ReactRouter from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Add from './Add';
import Success from './Success';


class App extends Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Nav />
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/add' component={Add}/>
             
            </Switch>
        </div>
      </Router>
    )
  }
}

export default App

//<Route path='/add/success' component={Success}/>