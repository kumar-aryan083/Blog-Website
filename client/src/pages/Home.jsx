import React, { useEffect } from 'react';

const Home = () => {
  useEffect(()=>{
    document.title = "Home";
  },[])
  
  return (
    <>
    <div>Home Page</div>
    </>
  );
}

export default Home;
