import React, { useEffect, useState } from 'react';
import Recent from '../components/Recent';
import Category from '../components/Category';
import './Style/Home.css';
import Loading from './Loading';

const Home = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCat, setLoadingCat] = useState(true);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [nothing, setNothing] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://webblogserver-production-46a4.up.railway.app/api/home/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await res.json();
        console.log(data);
        setCategories(data.structure[0]?.homeRow);
        setLoadingCat(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    if (loadingBlog || loadingCat) {
      document.querySelector('.load-section').style.display = 'block';
      document.querySelector('.wrapp-home').style.display = 'none';
      console.log('hit');
    } else {
      document.querySelector('.load-section').style.display = 'none';
      document.querySelector('.wrapp-home').style.display = 'block';
    }
  }, [loadingBlog, loadingCat])
  const handleLoading = () => {
    setLoadingBlog(false);
  }
  const handleData = (val) => {
    setNothing(val);
  }
  return (
    <>
      {nothing && <div className='nothing'>
        <div className="nothing-wrapp">
          <img src="https://img.freepik.com/premium-vector/nothing-here-flat-illustration_418302-77.jpg" alt="" />
        </div>
      </div>}
      <div className="load-section">
        <Loading />
      </div>
      <div className="wrapp-home">
        <Recent user={user} onComplete={handleLoading} handleData = {handleData} />
        {categories?.map((catName, index) => (
          <Category key={index} cat={catName} />
        ))}
      </div>
    </>
  );
};

export default Home;
