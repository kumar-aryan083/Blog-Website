import React from 'react'
import './Styles/ProfileCard.css'
import { Link } from 'react-router-dom'
const ProfileCard = ({
    user,
    isAdmin
}) => {
    const handleAddBlog = () => {
        localStorage.setItem('page', '2');
    }
    const handleDashboard = () => {
        localStorage.setItem('page', '1');
    }
  return (
    <>
        <div className="full-profile-card">
          <div className="profile-left">
            <div className="p-img-ctrl">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
            </div>
            <h3>Name: {user?.name}</h3>
          </div>
          <div className="profile-mid">
              <p>Username: {user?.username}</p>
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phone}</p>
              {isAdmin && <p>No. of Blogs: {user?.blogs?.length}</p>}
          </div>
          <div className="profile-right">
            <div className="p-btns">
              {isAdmin && <Link to = '/admin/dashboard'><div className="n-b" onClick={handleAddBlog}>Add Blog</div></Link>}
              {isAdmin && <Link to = '/admin/dashboard'><div className="d-b" onClick={handleDashboard}>Dashbard</div></Link>}
              {!isAdmin && <Link to = '/blog'><div className="n-b">All Blog</div></Link>}
            </div>
          </div>
        </div>
    </>
  )
}

export default ProfileCard