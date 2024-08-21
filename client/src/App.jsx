import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';

const App = () => {
  const [user, setUser] = useState(()=>{
    const sUser = localStorage.getItem("user");
    return sUser?JSON.parse(sUser):null;
  });

  const [message, setMessage] = useState(null);
  const handleAlert = (msg)=>{
    setMessage(msg);
  }

  return (
    <>
      <Navbar user={user} showAlert={message} handleAlert={handleAlert}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </>
  );
}

export default App;
