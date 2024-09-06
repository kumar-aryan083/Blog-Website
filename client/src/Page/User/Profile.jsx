import React, { useEffect, useState } from 'react'
import { checkAdmin } from '../../utils/SetValues';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard'
import ShowBlog from '../../components/ShowBlog';

const Profile = ({
  user
}) => {
  const nav = useNavigate();
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    document.title = `${user?.name} | Admin Profile`
    if (!user) {
      nav('/');
    }
  },[user])
  useEffect(() => {
    const verifyAdmin = async () => {
      const adminCheck = await checkAdmin();
      if (!user) {
        nav('/');
      }
      setAdmin(adminCheck.success);
      console.log(adminCheck);
    };
    verifyAdmin();
  }, [nav]);
  return (
    <>
      <div className="full-admin-profile">
        <ProfileCard user = {user} isAdmin = {admin}/>
      </div>
      <div className="all-blog">
        <ShowBlog user = {user}/>
      </div>
    </>
  )
}

export default Profile


