import React from 'react';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
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
                    <form>
                        <div className="admin-login-form">
                            <input type="text" placeholder='Username, Email or Number'/>
                            <input type="password" placeholder='Password'/>
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
