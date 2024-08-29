import React, { useEffect, useState } from 'react';
import './Styles/Navbar.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkValidation } from '../utils/setValues';

const Navbar = ({ user, showAlert, handleAlert, logout }) => {
  const [link, setLink] = useState("");

  const handleBgr = () => {
    const rNav = document.querySelector('.right-nav');
    rNav.style.left === "-100%" ? rNav.style.left = "0" : rNav.style.left = "-100%";
  }

  useEffect(() => {
    if (showAlert !== null) {
      const notify = () => toast(showAlert);
      notify();
      handleAlert(null);
    }
  }, [showAlert])

  useEffect(() => {
    showProfile();
  }, [user])

  const showProfile = () => {
    if (checkValidation()) {
      // console.log(checkValidation());
      setLink(`/admin/${user?.username}/profile`);
    } else {
      setLink(`/user/${user?.username}/profile`);
    }
  }

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
            <li className="nav-lists"><Link to="/contact-us">contact us</Link></li>
            <li className="nav-lists"><Link to="/">T & C</Link></li>
          </ul>
          {
            !user ? (
              <div className="btns">
                <Link to="/admin/login"><div className="btn-one"><i className="fa-solid fa-right-to-bracket"></i><span>login</span></div></Link>
                <Link to="/admin/register"><div className="btn-two"><i className="fa-solid fa-user-plus"></i><span>register</span></div></Link>
              </div>
            ) : (
              <div className="btns">
                <Link to={link}><div className="btn-one"><i className="fa-solid fa-user"></i><span>Profile</span></div></Link>
                <div className="btn-two" onClick={() => { logout() }}><i className="fa-solid fa-right-from-bracket"></i><span>Logout</span></div>
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
