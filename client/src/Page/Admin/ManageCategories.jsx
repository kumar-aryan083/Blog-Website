import React, { useEffect } from 'react'
import './Style/Dashboard.css'
import DashNav from '../../components/DashNav'
import CategoryDash from '../../components/CategoryDash'
const ManageCategories = ({
  user,
  showAlert
}) => {
  useEffect(() => {
    document.title = "Manage Comment | TechBlog"
  },[])
  return (
    <>
    <div className="full-dashboard">
        <div className="fd-left">
          <DashNav/>
        </div>
        <div className="fd-right">
          <CategoryDash user = {user} showAlert = {showAlert}/>
        </div>
      </div>
    </>
  )
}

export default ManageCategories