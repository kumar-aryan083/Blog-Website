import React, { useEffect, useState } from 'react';
import '../Styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { setLocal } from '../../utils/setValues';

const Register = ({handleAlert, onRegister, user}) => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    cnfPassword: ""
  })
  const [otp, setOtp] = useState('');
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=>{
    document.title = "Admin | Register";
    if(user){
      nav(`/admin/${user.username}/profile`);
    }
  },[])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // console.log(formData);
    const {cnfPassword, ...others} = formData;
    const res = await fetch("/api/admin/register", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(others)
    });
    const data = await res.json();
    if(res.ok){
      const {token, ...others} = data;
      document.querySelector('.full-otp-popup').style.display = 'flex';
    }else{
      handleAlert(data.message);
    }
  }
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  }
  const handleOtpSubmit = async(e)=>{
    e.preventDefault();
    console.log(otp);
    const res = await fetch("/api/admin/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        otp: otp
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if(res.ok){
      nav('/admin/login');
      handleAlert(data.message)
    }else{
      handleAlert(data.message)
    }
  }
  return (
    <>
      <div className="full-register-page">
        <div className="register-card">
            <h2>Admin Register</h2>
            <div className="l-register-card">
                <div className="left-register">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis officiis, voluptates, accusantium vitae aspernatur velit magnam dolorum voluptas molestias, iste asperiores! Ipsa consequuntur dolores ea distinctio quia, rerum inventore? Reprehenderit esse consequatur tempore. Aliquid veniam libero quasi iste consequuntur architecto, sapiente, aspernatur et fugiat a earum eligendi voluptas doloremque recusandae?</p>
                </div>
                <div className="right-register">
                    <form onSubmit={handleSubmit}>
                        <div className="admin-register-form">
                            <input type="text" placeholder='Full Name' name='name' value={formData.name} onChange={handleChange}/>
                            <input type="text" placeholder='Username' name='username' value={formData.username} onChange={handleChange}/>
                            <input type="email" placeholder='Email' name='email' value={formData.email} onChange={handleChange}/>
                            <input type="text" placeholder='Phone Number' name='phone' value={formData.phone} onChange={handleChange}/>
                            <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange}/>
                            <input type="password" placeholder='Confirm Password' name='cnfPassword' value={formData.cnfPassword} onChange={handleChange}/>
                            <input type="submit" value="register"/>
                        </div>
                        <div className="not-account">Already have an account? <Link to="/admin/login">Login here</Link></div>
                    </form>
                </div>
            </div>
        </div>
      </div>
      <div className="full-otp-popup">
        <div className="otp-pop-card">
          <h1>Enter Your OTP:</h1>
          <p>OTP sent on mail. Check Your mail.</p>
          <form onSubmit={handleOtpSubmit}>
            <input type="text" value={otp} onChange={handleOtpChange} placeholder='Enter Your OTP'/>
            <input type="submit" value="Submit OTP" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
