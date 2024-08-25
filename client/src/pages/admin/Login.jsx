import React, { useEffect, useState } from 'react';
import '../Styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { setLocal } from '../../utils/setValues.js';

const Login = ({handleAlert, onLogin, user}) => {
  const [formData, setFormData] = useState({
    id: "",
    password: ""
  })
  const nav = useNavigate();
  useEffect(() => {
    document.title = "Admin | Login"
    if(user){
      nav(`/admin/${user.username}/profile`);
    }
  }, [])
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // console.log(formData);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if(res.ok){
      const {token, ...others} = data;
      setLocal(others, data.token);
      onLogin();
      nav('/admin/dashboard');
      handleAlert(data.message);
    }else{
      handleAlert(data.message);
    }
  }

  return (
    <>
      <div className="full-login-page">
        <div className="login-card">
            <h2>Admin Login</h2>
            <div className="l-login-card">
                <div className="left-login">
                    <h3>Welcome Back</h3>
                    <p><i>Enter your username/email/phone and password to login</i></p>
                </div>
                <div className="right-login">
                    <form onSubmit={handleSubmit}>
                        <div className="admin-login-form">
                            <input type="text" placeholder='Username, Email or Number' name='id' value={formData.id} onChange={handleChange}/>
                            <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange}/>
                            <input type="submit" value="Login"/>
                        </div>
                        <div className="not-account">Don't have an account? <Link to="/admin/register">Register here</Link></div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Login;
