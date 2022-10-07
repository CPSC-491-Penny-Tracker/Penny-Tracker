import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Summary from './routes/summary';
import Planner from './routes/planner';
import Product from './routes/product';
import Login from './routes/login';
import Dashboard from './routes/dashboard';
import JwtService from './service/JwtService';
import './App.css';
import Tabs from "./components/Tab";

const PrivateRoute = () => 
  JwtService.getAuthToken() ? <Outlet /> : <Navigate to="/login" />;

const App = () => {
  return (
    <React.Fragment>
      <Tabs />
      <main className="panels">
        <Routes>
          <Route exact path='/' element={<Planner/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/planner' element={<Planner/>}/>
          <Route path='/summary' element={<Summary/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
        </Routes>  
      </main>
  </React.Fragment>
  );
}

export default App;