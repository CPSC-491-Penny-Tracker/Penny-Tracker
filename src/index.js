import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { UserProvider }from './context/UserContext';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <UserProvider>
    <HashRouter>
      <App /> 
    </HashRouter>
  </UserProvider>, 
  document.getElementById('root')
);
