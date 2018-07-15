import React, { Component } from 'react';
import ReactRouter from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';


class App extends Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Nav />
            I found this type and I really, really like it!
        </div>
      </Router>
    )
  }
}

export default App