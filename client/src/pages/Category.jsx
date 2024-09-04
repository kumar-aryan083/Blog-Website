import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BarCard from '../components/BarCard';
import './Styles/Category.css';

const Category = () => {
  const { catName } = useParams();
  const [catBlog, setCatBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const [cat, setCat] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getCatBlog = async () => {
      const res = await fetch(`/api/category/byname/${catName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok) {
        setCatBlog(data.catBlog);
        console.log(data);
        setLoading(false);
      }
    };
    getCatBlog();
  }, [catName]);

  useEffect(() => {
    const getCat = async () => {
      const res = await fetch('/api/category/all-category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok) {
        setCat(data.categories);
      }
    };
    getCat();
    document.documentElement.scrollTop = 0;
  }, []);

  const totalPages = Math.ceil(catBlog?.blogs.length / itemsPerPage);

  const currentItems = catBlog?.blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="load" style={{ display: loading ? "flex" : "none" }}>
        <div className="loading"></div>
        <p>Loading...</p>
      </div>
      <div className="full-cat-wrapper">
        <div className="cat-left-side">
          <div className="card-holder">
            {currentItems?.length > 0 ? (
              <>
                {currentItems.map((e, i) => (
                  <BarCard key={e._id} details={e} />
                ))}
              </>
            ) : (
              <>No blogs to show</>
            )}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={index + 1 === currentPage ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="cat-right-side">
          <div className="cat-wrapper">
            <h1>Categories</h1>
            <ul>
              {cat?.length > 0 ? (
                <>
                  {cat.reverse().map((e, i) => (
                    <Link key={e._id} to={`/${e.catName.toLowerCase()}`}>
                      <li>{e.catName}</li>
                    </Link>
                  ))}
                </>
              ) : (
                <li>No category to show</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
