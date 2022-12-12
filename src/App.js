import React from 'react';
import { Route, Routes, Outlet, Navigate, Redirect, useParams } from 'react-router-dom';
import Summary from './routes/sum';
import Planner from './routes/limit';
import Product from './routes/product';
import Dashboard from './routes/dashboard';
import Registration from './routes/registration';
import JwtService from './service/JwtService';
import Users from './routes/users';
import './App.css';
import Tabs from "./components/Tab";

const PrivateRoute = () => 
  JwtService.getAuthToken() ? <Outlet /> : <Navigate to="/users" />;

const App = () => {
  return (
    <React.Fragment>
      <Tabs />
      <main className="panels">
        <Routes>
          <Route exact path='/' element={<Product/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/planner' element={<Planner/>}/>
          <Route path='/summary' element={<Summary/>}/>
          <Route path='/register' element={<Registration />}/>
          <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Summary/>}/>
          </Route>
          <Route path='/users' element={<Users/>}/>
        </Routes>  
      </main>
  </React.Fragment>
  );
}

export default App;