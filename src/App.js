import React, { Component } from 'react';
import './planner.js'
import './product.js'
import './summary.js'
import './users.js'
import './App.css';
import Tabs from "./components/Tab";

const App = () => {
  return (
    <div className="App">
      <Tabs />
    </div>
  );
}

export default App;