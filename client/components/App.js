import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Add from './Add';
import Photo from './Photo';
import Mine from './Mine';
import LogIn from './Login';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  black: '#393939',
  green:  'rgba(10, 196, 50, 0.952)',
  maxWidthOuter: '1200px',
  maxWidthInner: '1000px',
};

const StyledContainer = styled.div.attrs({
  className: 'outer_container'
})`
  max-width: ${props => props.theme.maxWidthOuter};
  color: ${props => props.theme.black};
  margin: 0 auto;
  height: 100vh;
`;

const StyledInner = styled.div.attrs({
  className: 'inner'
})`
  max-width: ${props => props.theme.maxWidthInner};
  margin: 0 auto;
  padding: 0 3em 0 3em;
`;

class App extends Component {
 state = {
   access: 'Log In',
   username:'',
   isAuthed: false
 }

 setLogIn = (user) => {
   console.log('changing auth')
   console.log('user',user)
   this.setState(() => ({
     access: 'Log Out',
     isAuthed: true,
     username: user
   }));
 }

  render () {
    const { access, username, isAuthed } = this.state;
    return (
        <ThemeProvider theme={theme}>
          <Router>
            <StyledContainer>
              <Nav 
                logged={access} 
                name={username}
                isUser={isAuthed}
              />
              <StyledInner>
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
              </StyledInner>
            </StyledContainer>
          </Router>
        </ThemeProvider>
    )
  }
}

export default App
