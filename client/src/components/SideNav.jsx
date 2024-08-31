import React from 'react';
import { Link } from 'react-router-dom';
import "./Styles/SideNav.css"

const SideNav = ({
    setPage
}) => {
  return (
    <>
      <div className="full-side-nav">
        <ul className="admin-nav-lists">
            <li onClick={()=>{setPage("1")}}>Home</li>
            <li onClick={()=>{setPage("2")}}>Add Blogs</li>
            <li onClick={()=>{setPage("3")}}>Manage Category</li>
            <li onClick={()=>{setPage("4")}}>Manage Home</li>
            <li onClick={()=>{setPage("5")}}>Form Submissions</li>
        </ul>
      </div>
    </>
  );
}

export default SideNav;
