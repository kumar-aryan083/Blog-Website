import React, { useEffect } from 'react';
import './Styles/Recent.css';
import { Link } from 'react-router-dom'
const Recent = ({
  blogs,
  handleAlert
}) => {

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }
  return (
    <>
      <h2 className='r-head'>Recent Blogs</h2>
      <div className="recent-home">
        <Link to={`/${blogs?.allBlogs[blogs?.allBlogs?.length - 1]?.cat.catName.toLowerCase()}/${blogs?.allBlogs[blogs?.allBlogs?.length - 1]?.slug}`}><div className="left-recent">
          <div className="img-ctrl">
            <img src={blogs?.allBlogs[blogs?.allBlogs?.length - 1]?.image} alt="" />
          </div>
          <div className="left-recent-content">
            <h2>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 1]?.title, 50)}</h2>
            <p>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 1]?.description, 120)}</p>
            <p className="admin-name">{blogs?.allBlogs[blogs?.allBlogs?.length - 1]?.adminId?.name}</p>
          </div>
          <p className='left-recent-category'>{blogs?.allBlogs[blogs?.allBlogs?.length - 1]?.cat?.catName}</p>
        </div></Link>
        <div className="right-recent">
          <div className="rr-cards">
            <div>
              <Link to={`/${blogs?.allBlogs[blogs?.allBlogs?.length - 2]?.cat.catName.toLowerCase()}/${blogs?.allBlogs[blogs?.allBlogs?.length - 2]?.slug}`}>
                <div className="r-img-ctrl">
                  <div className="ric-ctrl">
                    <img src={blogs?.allBlogs[blogs?.allBlogs?.length - 2]?.image} alt="" />
                  </div>
                  <div className="r-img-ctrl-content">
                    <h2>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 2]?.title, 50)}</h2>
                    <p>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 2]?.description, 50)}</p>
                    <p className="admin-name">{blogs?.allBlogs[blogs?.allBlogs?.length - 2]?.adminId.name}</p>
                  </div>
                  <p className='rr-keyword'>{blogs?.allBlogs[blogs?.allBlogs?.length - 2]?.cat?.catName}</p>
                </div>
              </Link>
              <Link to={`/${blogs?.allBlogs[blogs?.allBlogs?.length - 3]?.cat.catName.toLowerCase()}/${blogs?.allBlogs[blogs?.allBlogs?.length - 3]?.slug}`}>
                <div className="r-img-ctrl">
                  <div className="ric-ctrl">
                    <img src={blogs?.allBlogs[blogs?.allBlogs?.length - 3]?.image} alt="" />
                  </div>
                  <div className="r-img-ctrl-content">
                    <h2>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 3]?.title, 50)}</h2>
                    <p>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 3]?.description, 50)}</p>
                    <p className="admin-name">{blogs?.allBlogs[blogs?.allBlogs?.length - 3]?.adminId.name}</p>
                  </div>
                  <p className='rr-keyword'>{blogs?.allBlogs[blogs?.allBlogs?.length - 3]?.cat?.catName}</p>
                </div>
              </Link>
            </div>
            <div>
              <Link to={`/${blogs?.allBlogs[blogs?.allBlogs?.length - 4]?.cat.catName.toLowerCase()}/${blogs?.allBlogs[blogs?.allBlogs?.length - 4]?.slug}`}>
                <div className="r-img-ctrl">
                  <div className="ric-ctrl">
                    <img src={blogs?.allBlogs[blogs?.allBlogs?.length - 4]?.image} alt="" />
                  </div>
                  <div className="r-img-ctrl-content">
                    <h2>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 4]?.title, 50)}</h2>
                    <p>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 4]?.description, 50)}</p>
                    <p className="admin-name">{blogs?.allBlogs[blogs?.allBlogs?.length - 4]?.adminId.name}</p>
                  </div>
                  <p className='rr-keyword'>{blogs?.allBlogs[blogs?.allBlogs?.length - 4]?.cat?.catName}</p>
                </div>
              </Link>
              <Link to = {`/${blogs?.allBlogs[blogs?.allBlogs?.length - 5]?.cat.catName.toLowerCase()}/${blogs?.allBlogs[blogs?.allBlogs?.length - 5]?.slug}`}>
              <div className="r-img-ctrl">
                <div className="ric-ctrl">
                  <img src={blogs?.allBlogs[blogs?.allBlogs?.length - 5]?.image} alt="" />
                </div>
                <div className="r-img-ctrl-content">
                  <h2>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 5]?.title, 50)}</h2>
                  <p>{truncateText(blogs?.allBlogs[blogs?.allBlogs?.length - 5]?.description, 50)}</p>
                  <p className="admin-name">{blogs?.allBlogs[blogs?.allBlogs?.length - 5]?.adminId.name}</p>
                </div>
                <p className='rr-keyword'>{blogs?.allBlogs[blogs?.allBlogs?.length - 5]?.cat?.catName}</p>
              </div>
              </Link>

          </div>

        </div>
      </div>
    </div >
    </>
  );
}

export default Recent;
