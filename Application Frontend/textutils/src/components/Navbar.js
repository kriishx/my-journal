import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar(props) {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">{props.aboutText}</Link>
            </li>

            {isLoggedIn && (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  id="updateDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Update
                </button>
                <ul className="dropdown-menu" aria-labelledby="updateDropdown">
                  <li>
                    <Link className="dropdown-item" to="/update-password">Update Password</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/update-details">Update User Details</Link>
                  </li>
                </ul>
              </li>
            )}

            {isLoggedIn && (
              <li className='nav-item'>
                <button className="btn btn-danger btn-sm ms-2 my-1" onClick={handleLogout}>Logout</button>
              </li>
            )}
            
            
            </ul>
            
            <div className={`form-check form-switch text-light text-${props.mode === "light"? "dark":"light"}`}>
                <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="switchCheckDefault"/>
                <label className="form-check-label" htmlFor="switchCheckDefault">Dark Mode</label>
            </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string.isRequired
}
