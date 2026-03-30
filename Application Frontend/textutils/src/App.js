import { useState } from 'react';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/Textform';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import RegisterUser from './components/RegisterUser';
import Login from './components/Login';
import HomePage from './components/Homepage';
import AllEntries from './components/AllEntries'
import ReadSingleEntry from './components/ReadSingleEntry';
import { ToastContainer } from 'react-toastify';
import UpdateUserDetails from './components/UpdateUserDetails';
import EditEntry from './components/EditEntry';
import ChangePassword from './components/ChangePassword';



function App() {

  const [mode,setMode] = useState("light");

  const toggleMode = ()=>{
    if(mode === "light"){
      setMode("dark");
      document.body.style.backgroundColor = '#1e1e2f';
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = 'white';
    }
  }

  return (
  <>
    <Router>
    <Navbar title = {<img 
        src="/android-chrome-512x512.png" 
        alt="App Logo" 
        width="50" 
        height="50"
      />} aboutText = "About" mode = {mode} toggleMode = {toggleMode} />
    <div className="container my-3" >
      <Routes>
        <Route path='/' element={<HomePage mode={mode} />}/>  
        <Route exact path="/login"  element={<Login mode = {mode}/>} />
          <Route exact path="/textform" element={<ProtectedRoute><TextForm title = "Title" content = "Content" mode = {mode}/></ProtectedRoute>} />
          <Route exact path="/entries" element={<ProtectedRoute><AllEntries mode = {mode}/></ProtectedRoute>} />
          <Route path="/change-password" element={<ChangePassword mode={mode} />} />
          <Route exact path="/journal/:id" element={<ProtectedRoute><ReadSingleEntry mode={mode} /></ProtectedRoute>} />
          <Route exact path="/edit/:id" element={<ProtectedRoute><EditEntry mode={mode} /></ProtectedRoute>} />
          <Route path="/update-details" element={<UpdateUserDetails />} />



      <Route exact path="/register" element={<RegisterUser mode = {mode}/>} />
      <Route exact path="/about" element={<About mode = {mode}/>} />
        </Routes>
      
    </div>
    </Router>

    <ToastContainer position='top-right' autoClose = {3000}/>
    
  </>

  );
}

export default App;
