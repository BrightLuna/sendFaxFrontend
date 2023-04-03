import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Faxsend from './components/Fax/Faxsend';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css"; 


function App() {

  // if(!token){
  //   return <Login />
  // }

  return (
    <div className='wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Faxsend />} />
          <Route path='/preferences' element={<></>} />
        </Routes>
      </BrowserRouter>
      <div className='footer'>
        制作者 : 荒木 宮地
      </div>
    </div>
  );
}

export default App;
