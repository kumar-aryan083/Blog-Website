import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import { handleLogout } from './utils/setValues';
import Profile from './pages/admin/Profile';
import Dashboard from './pages/admin/Dashboard';
import Contact from './pages/Contact';
import UserRegister from './pages/user/userRegister';
import UserLogin from './pages/user/userLogin';

const App = () => {
  const [user, setUser] = useState(() => {
    const sUser = localStorage.getItem("user");
    return sUser ? JSON.parse(sUser) : null;
  });

  const [message, setMessage] = useState(null);
  const handleAlert = (msg) => {
    setMessage(msg);
  }
  const handleOut = () => {
    handleLogout()
    setUser(null);
  }

  const settingUser = () => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }

  return (
    <>
      <Navbar user={user} showAlert={message} handleAlert={handleAlert} logout={handleOut} />
      <div className="full-body-wrapp">
        <Routes>
          <Route
            path='/'
            element={
              <Home
              handleAlert={handleAlert}
              />
            }
          />
          <Route
            path='/admin/login'
            element={
              <Login
                handleAlert={handleAlert}
                onLogin={settingUser}
                user={user}
              />}
          />
          <Route
            path='/admin/register'
            element={
              <Register
                handleAlert={handleAlert}
                onRegister={settingUser}
                user={user}
              />}
          />
          <Route
            path='/admin/:username/profile'
            element={
              <Profile />
            }
          />
          <Route
            path='/user/login'
            element={
              <UserLogin
                handleAlert={handleAlert}
                onLogin={settingUser}
                user={user}
              />}
          />
          <Route
            path='/user/register'
            element={
              <UserRegister
                handleAlert={handleAlert}
                onRegister={settingUser}
                user={user}
              />}
          />
          <Route
            path='/user/:username/profile'
            element={
              <Profile />
            }
          />
          <Route
            path='/admin/dashboard'
            element={
              <Dashboard
                user={user}
                handleAlert={handleAlert}
              />
            }
          />
          <Route
            path='/about'
            element={
              <About
              />
            }
          />
          <Route
            path='/contact-us'
            element={
              <Contact user={user} handleAlert={handleAlert} />
            }
          />
          <Route
            path='/*'
            element={
              <Home />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
