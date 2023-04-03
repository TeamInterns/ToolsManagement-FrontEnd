import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import UserAddTools from './UserAddTools'
import Notifications from './Notifications'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dash" element={<Dashboard/>}/>
        <Route path="/addTools" element={<UserAddTools/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
