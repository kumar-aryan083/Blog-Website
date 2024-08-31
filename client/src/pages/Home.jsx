import React, { useEffect, useState } from 'react';
import './Styles/Home.css';
import Recent from '../components/Recent';
import Xsroll from '../components/Xsroll';

const Home = ({ handleAlert }) => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    document.title = "Home";
    const getBlogs = async () => {
      const res = await fetch("/api/common/all-blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      if (res.ok) {
        setBlogs(data);
      } else {
        handleAlert(data.success);
      }
    }
    getBlogs();
  }, [])
  
  return (
    <>
      <div className="full-home">
        <Recent blogs = {blogs} handleAlert= {handleAlert}/>
        <Xsroll catId = "66d09373556de5df6723552e" blogs = {blogs}/>

      </div>
    </>
  );
}

export default Home;
