import React, { useEffect, useRef, useState } from 'react';
import './Styles/Xscroll.css';
import Card from './Card';

const Xscroll = ({ catId }) => {
  const [b, setBlogs] = useState([]);
  const cardContainer = useRef(null);
  useEffect(() => {
    getData();
  }, [catId]); 
  const getData = async () => {
    const res = await fetch(`/api/category/${catId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if(res.ok){
      setBlogs(data.catBlog);
    }
  }
  const handleLeft = () => {
    cardContainer.current.scrollBy({
      left: -150,
      behavior: 'smooth'
    })
  }
  const handleRight = () => {
    cardContainer.current.scrollBy({
      left: 150,
      behavior: 'smooth'
    })
  }
  return (
    <>
     <div className="x-scroll-wrapper">
      <div className="xs-header">
        <h3>{b?.catName}</h3>
        <div className="xs-line"></div>
        <div className="xs-controller">
          <div className="xsc-left" onClick={handleLeft}><i className="fa-solid fa-arrow-left"></i></div>
          <div className="xsc-right" onClick={handleRight}><i className="fa-solid fa-arrow-right"></i></div>
        </div>
      </div>
      <div className="card-wrapper" ref={cardContainer}>
        {b?.blogs?.length > 0 ? (
          <>
            {b?.blogs?.map((e, i) => (
              <Card blog={e} key={i}/>
            ))}
          </>
        ) : (
          <>
            <div className="com-loading">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          </>
        )}
      </div>
     </div>
    </>
  );
};

export default Xscroll;
