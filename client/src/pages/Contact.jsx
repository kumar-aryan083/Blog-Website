import React, { useState } from 'react';
import './Styles/Contact.css';
import { useNavigate } from 'react-router-dom';

const Contact = ({user, handleAlert}) => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        keyword: "",
        message: ""
      });
    const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        // console.log(formData);
        const res = await fetch("/api/user/contact-us", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token")
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(res.ok){
          handleAlert(data.message)
          nav('/');
        }else{
          handleAlert(data.message)
        }
    }
  return (
    <>
      <div className="full-contact-page">
        <div className="contact-card">
            <h2>Contact Form</h2>
            <div className="l-contact-card">
                <div className="left-contact">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis officiis, voluptates, accusantium vitae aspernatur velit magnam dolorum voluptas molestias, iste asperiores! Ipsa consequuntur dolores ea distinctio quia, rerum inventore? Reprehenderit esse consequatur tempore. Aliquid veniam libero quasi iste consequuntur architecto, sapiente, aspernatur et fugiat a earum eligendi voluptas doloremque recusandae?</p>
                </div>
                <div className="right-contact">
                    <form onSubmit={handleSubmit}>
                        <div className="admin-contact-form">
                            <input type="text" placeholder='Full Name' name='name' value={formData.name} onChange={handleChange} readOnly/>
                            <input type="text" placeholder='Username' name='username' value={formData.username} onChange={handleChange} readOnly/>
                            <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleChange} readOnly/>
                            <input type="text" placeholder='Phone Number' name='phone' value={formData.phone} onChange={handleChange} readOnly/>
                            <select name="keyword" id="keyword-options" onChange={handleChange}>
                                <option value="">Select Keyword</option>
                                <option value="none">None</option>
                                <option value="general">General Enquiry</option>
                                <option value="application-status">Application status</option>
                            </select>
                            <textarea name="message" value={formData.message} onChange={handleChange} rows={8} placeholder='Write your message'></textarea>
                            <input type="submit" value="Submit Form"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
