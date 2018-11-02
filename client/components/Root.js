import React from 'react';
import App from './App';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
  }
  ul {
    padding: 0px;
  }
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
  }
`;

const Root = () => {
  return (
    <React.Fragment>
      <App/>
      <GlobalStyle/>
    </React.Fragment>
  )
}

export default Root;