import React from 'react';
import Planner from './planner.js'
import './product.js'
import './summary.js'
import './users.js'
import './App.css';
import Tabs from "./components/Tab";

const App = () => {
  return (
    <div className="App">
      <Tabs />
      <Planner />
    </div>
  );
}

export default App;