import React from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';
import Summary from './routes/summary';
import Planner from './routes/planner';
import Product from './routes/product';
import Login from './routes/login';
import './App.css';
import Tabs from "./components/Tab";

const App = () => {
  return (
    <React.Fragment>
      <Tabs />
      <main className="panels">
        <Routes>
          <Route exact path='/' element={<Planner/>}/>\
          <Route path='/product' element={<Product/>}/>
          <Route path='/summary' element={<Summary/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>  
      </main>
  </React.Fragment>
  );
}

export default App;