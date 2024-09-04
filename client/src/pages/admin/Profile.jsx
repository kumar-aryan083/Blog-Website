import React, { useEffect, useState } from 'react'
import { checkValidation as checkAdmin } from '../../utils/setValues';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard';
import './Styles/Profile.css'
import ShowBlog from '../../Components/ShowBlog';

const Profile = ({
  user
}) => {
  const nav = useNavigate();
  const [isAdmin, setAdmin] = useState(false);
  useEffect(() => {
    document.title = `${user?.name} | Admin Profile`
    if (!user) {
      nav('/');
    }
  },[user])
  useEffect(() => {
    const verifyAdmin = async () => {
      const adminCheck = await checkAdmin();
      setAdmin(adminCheck);
      if (!user) {
        nav('/');
      }
    };
    verifyAdmin();
  }, [nav]);
  return (
    <>
      <div className="full-admin-profile">
        <ProfileCard user = {user} isAdmin={isAdmin}/>
      </div>
      <div className="all-blog">
        <ShowBlog user = {user}/>
      </div>
    </>
  )
}

export default Profile


