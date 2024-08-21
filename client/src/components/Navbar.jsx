import React, { useEffect } from 'react';
import './Styles/Navbar.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ user, showAlert, handleAlert }) => {

  const handleBgr = () => {
    const rNav = document.querySelector('.right-nav');
    rNav.style.left === "-100%" ? rNav.style.left = "0" : rNav.style.left = "-100%";
  }

  useEffect(()=>{
    if(showAlert !== null){
      const notify = () => toast(showAlert);
      notify();
      handleAlert(null);
    }
  },[showAlert])

  return (
    <>
      <nav className="navbar">
        <div className="left-nav">
          <h2>Blog Website</h2>
        </div>
        <div className="right-nav">
          <ul className="nav-ul">
            <li className="nav-lists"><Link to="/">home</Link></li>
            <li className="nav-lists"><Link to="/">about</Link></li>
            <li className="nav-lists"><Link to="/">blogs</Link></li>
            <li className="nav-lists"><Link to="/">contact us</Link></li>
            <li className="nav-lists"><Link to="/">T & C</Link></li>
          </ul>
          {
            !user ? (
              <div className="btns">
                <div className="btn-one"><i className="fa-solid fa-right-to-bracket"></i><span>login</span></div>
                <div className="btn-two"><i className="fa-solid fa-user-plus"></i><span>register</span></div>
              </div>
            ) : (
              <div className="btns">
                <div className="btn-one"><i className="fa-solid fa-user"></i><span>Profile</span></div>
                <div className="btn-two"><i className="fa-solid fa-right-from-bracket"></i><span>Logout</span></div>
              </div>
            )
          }
        </div>
        <div className="bgr" onClick={handleBgr}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
}

export default Navbar;
