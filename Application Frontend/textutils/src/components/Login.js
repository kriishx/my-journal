import React, { useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';



export default function Login(props) {

  const [formData, setFormData] = useState({username:"", password:""});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
  }

  const handleLogin = async (e) =>{
    e.preventDefault();
    try{
      const res = await axiosInstance.post("public/login", formData);
      const token = res.data.token;

      localStorage.setItem('token',token);

      setError("");
      navigate("/")
    }catch(err){

      console.error(err);
      setError("Invalid Credentials");

    }
  }

  return (
    <div>
        <form onSubmit={handleLogin} style={{color: props.mode ==='dark'?'white':'black'}}>
            <div className="form-group my-5 mb-1">
                <label htmlFor="username">Username:</label>
                <input className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} type="text" style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode==="light"?"black":"white"}} name = 'username' value={formData.username} onChange={handleChange} placeholder='Username' required/>
                <small id="usernameHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
            </div>
            <div className="form-group my-3">
                <label htmlFor="password">Password</label>
                <input type="password" name = 'password' value={formData.password} style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode==="light"?"black":"white"}} onChange={handleChange} className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} id="exampleInputPassword1" placeholder='Password' required/>
            </div>
            <button className={`btn mx-2 my-2`} type='submit' style={{backgroundColor: '#7a23b5'}}>Login</button>
            {error && (
              <div className="alert alert-danger mt-2" role="alert">
                {error}
              </div>
            )}
            <p className="mt-3">
              New user?{" "}
              <span
                style={{ color: "#7a23b5", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </span>
            </p>
        </form>
    </div>
  )
}
