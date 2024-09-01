import React, { useEffect, useState } from 'react';
import './Styles/Home.css';
import Recent from '../components/Recent';
import Xsroll from '../components/Xsroll';

const Home = ({ handleAlert }) => {
  const [blogs, setBlogs] = useState(null);
  const [catIds, setCatIds] = useState([])

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
  useEffect(() => {
    const getCat = async () => {
      const res = await fetch('/api/home/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      if(res.ok){
        setCatIds(data.structure[0].homeRow);
        // console.log(data);
      }
    }
    getCat();
  }, [])
  return (
    <>
      <div className="full-home">
        <Recent blogs = {blogs} handleAlert= {handleAlert}/>
        {catIds?.length>0?(
          <>
              {
                catIds?.map((id, idx) => (
                  <Xsroll key = {idx} catId={id}/>
                ))
              }
          </>
        ):(
          <>

          </>
        )}
      </div>
    </>
  );
}

export default Home;
