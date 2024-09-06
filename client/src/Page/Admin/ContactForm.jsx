import React, { useEffect } from 'react'
import './Style/Dashboard.css'
import DashNav from '../../components/DashNav'
import FormCard from '../../components/FormCard'

const ContactForm = ({
  showAlert
}) => {
  useEffect(() => {
    document.title = "Form Submission | TechBlog"
  },[])
  return (
    <>
    <div className="full-dashboard">
        <div className="fd-left">
          <DashNav/>
        </div>
        <div className="fd-right">
          <FormCard showAlert={showAlert}/>
        </div>
      </div>
    </>
  )
}

export default ContactForm