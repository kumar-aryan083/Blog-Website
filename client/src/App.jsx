import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';

const App = () => {
  const [user, setUser] = useState(() => {
    const sUser = localStorage.getItem("user");
    return sUser ? JSON.parse(sUser) : null;
  });

  const [message, setMessage] = useState(null);
  const handleAlert = (msg) => {
    setMessage(msg);
  }

  return (
    <>
      <Navbar user={user} showAlert={message} handleAlert={handleAlert} />
      <div className="full-body-wrapp">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/login' element={<Login handleAlert={handleAlert}/>} />
          <Route path='/admin/register' element={<Register handleAlert={handleAlert}/>} />
          <Route path='/admin/:username/profile' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
